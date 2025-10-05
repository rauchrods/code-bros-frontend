import { useCallback, useEffect, useRef, useState } from "react";
import type { Language, RunResponse } from "../types";
import type { Theme } from "@monaco-editor/react";

import ProblemStatement from "../components/ProblemStatement";

import CodeEditor, { type CodeEditorRef } from "../components/CodeEditor";
import "./CodeEditorPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { PROBLEMS } from "../constants/problems";
import Loader from "../ui/Loader";
import CodeControls from "../components/CodeControls";
import { runCode, submitCode } from "../services/api";

const CodeEditorPage = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();

  const problem = PROBLEMS.find((p) => p.id === problemId);

  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<Language>("javascript");
  const [output, setOutput] = useState<string>(
    "Run your code to see the output"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>("vs-dark");

  // Resizable panel state
  const [leftPanelWidth, setLeftPanelWidth] = useState<number>(50); // percentage
  const [rightPanelWidth, setRightPanelWidth] = useState<number>(50); // percentage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasBeenResized, setHasBeenResized] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ref for CodeEditor to access formatting
  const codeEditorRef = useRef<CodeEditorRef>(null);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language]);
    }
  }, [problem, language]);

  useEffect(() => {
    if (!problem) {
      navigate("/");
    }
  }, [problem, navigate]);

  console.log("code", code);

  const handleRun = async () => {
    setLoading(true);
    try {
      const data: RunResponse = await runCode(code, language);

      console.log("Run response:", data);

      if (data.success) {
        const result = data.result;
        if (result.stderr) {
          setOutput(`❌ Error:\n${result.stderr}`);
        } else if (result.stdout) {
          setOutput(`✅ Output:\n${result.stdout}`);
        } else {
          setOutput("No output");
        }
      } else {
        setOutput(`Error: ${data.result.status || "Failed to run code"}`);
      }
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput(
        "❌ Error: Failed to execute code. Make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!problemId) {
      setOutput("Error: Problem ID not found");
      return;
    }

    setLoading(true);
    setOutput("Submitting code and running test cases...");

    try {
      const data = await submitCode(code, language, problemId);

      if (data.success) {
        if (data.allPassed) {
          // All tests passed
          let resultText = `🎉 Accepted! All ${data.totalTests} test cases passed!\n\n`;
          resultText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

          data.testResults.forEach((test, idx) => {
            resultText += `✅ Test Case ${idx + 1}: PASSED\n`;
            resultText += `   Input: ${test.input}\n`;
            resultText += `   Time: ${test.executionTime}ms\n\n`;
          });

          setOutput(resultText);
        } else {
          // Some tests failed
          let resultText = `❌ Wrong Answer\n`;
          resultText += `${data.passedCount}/${data.totalTests} test cases passed\n\n`;
          resultText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

          data.testResults.forEach((test, idx) => {
            if (test.passed) {
              resultText += `✅ Test Case ${idx + 1}: PASSED\n`;
              resultText += `   Input: ${test.input}\n`;
              resultText += `   Time: ${test.executionTime}ms\n\n`;
            } else {
              resultText += `❌ Test Case ${idx + 1}: FAILED\n`;
              resultText += `   Input: ${test.input}\n`;
              resultText += `   Expected: ${test.expectedOutput}\n`;
              resultText += `   Got: ${test.actualOutput}\n`;
              if (test.error) {
                resultText += `   Error: ${test.error}\n`;
              }
              resultText += `   Time: ${test.executionTime}ms\n\n`;
            }
          });

          setOutput(resultText);
        }
      } else {
        setOutput(`Error: ${data.message || "Failed to submit code"}`);
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      setOutput(
        "❌ Error: Failed to submit code. Make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFormat = useCallback((): void => {
    if (codeEditorRef.current) {
      codeEditorRef.current.formatCode();
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;

      // Calculate new width as percentage (with min/max constraints)
      const newLeftWidth = Math.min(
        Math.max((mouseX / containerWidth) * 100, 20),
        80
      );
      const newRightWidth = 100 - newLeftWidth;

      setLeftPanelWidth(newLeftWidth);
      setRightPanelWidth(newRightWidth);
      setHasBeenResized(true);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="code-editor-page" ref={containerRef}>
      <div
        className="left"
        style={hasBeenResized ? { width: `${leftPanelWidth}%` } : undefined}
      >
        <ProblemStatement problem={problem} />
      </div>

      <div
        className={`divider ${isDragging ? "dragging" : ""}`}
        onMouseDown={handleMouseDown}
      ></div>

      <div
        className="right"
        style={hasBeenResized ? { width: `${rightPanelWidth}%` } : undefined}
      >
        <CodeControls
          onLanguageChange={setLanguage}
          onThemeChange={setTheme}
          handleRun={handleSubmit}
          handleFormat={handleFormat}
          language={language}
          theme={theme}
          loading={loading}
          difficulty={problem ? problem.difficulty : "Easy"}
        />

        <div className="code-section">
          {loading ? (
            <Loader />
          ) : (
            <CodeEditor
              ref={codeEditorRef}
              language={language}
              code={code}
              onChange={(value) => setCode(value || "")}
              theme={theme}
            />
          )}
        </div>

        <div className="output-section">
          <h3>Output:</h3>
          <pre className="output">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
