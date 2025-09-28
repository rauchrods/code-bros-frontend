import { useCallback, useEffect, useRef, useState } from "react";
import type { CodeResult, Language } from "../types";
import type { Theme } from "@monaco-editor/react";
import { runCode } from "../utils/runcode";
import ProblemStatement from "../components/ProblemStatement";

import CodeEditor from "../components/CodeEditor";
import "./CodeEditorPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { PROBLEMS } from "../constants/problems";
import Loader from "../ui/Loader";

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

  const handleRun = async (): Promise<void> => {
    setLoading(true);
    try {
      const result: CodeResult | null = await runCode(code, language);
      if (result) {
        setOutput(
          result.stdout ||
            result.stderr ||
            result.compile_output ||
            result.status?.description ||
            "No output"
        );
      } else {
        setOutput("Error: Failed to execute code");
      }
    } catch (error) {
      console.log("Error executing code:", error);
      setOutput("Error: Failed to execute code");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="controls">
          <div className="control-group">
            <label htmlFor="language-select">Language:</label>
            <select
              id="language-select"
              onChange={(e) => setLanguage(e.target.value as Language)}
              value={language}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="theme-select">Theme:</label>
            <select
              id="theme-select"
              onChange={(e) => setTheme(e.target.value as Theme)}
              value={theme}
            >
              <option value="vs-dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <button className="run-button" onClick={handleRun} disabled={loading}>
            {loading ? "Running..." : "Run Code"}
          </button>
        </div>

        <div className="code-section">
          {loading ? (
            <Loader />
          ) : (
            <CodeEditor
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
