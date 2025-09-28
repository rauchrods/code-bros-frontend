import type { Theme } from "@monaco-editor/react";
import type { Difficulty, Language } from "../types";
import "./CodeControls.scss";
import { Wand } from "lucide-react";
import { getDifficultyColor } from "../utils/difficultyColor";

interface CodeControlsProps {
  onLanguageChange: (language: Language) => void;
  onThemeChange: (theme: Theme) => void;
  handleRun: () => void;
  handleFormat: () => void;
  language: Language;
  theme: Theme;
  loading: boolean;
  difficulty: Difficulty;
}

const CodeControls: React.FC<CodeControlsProps> = ({
  onLanguageChange,
  onThemeChange,
  handleRun,
  handleFormat,
  language,
  theme,
  loading,
  difficulty,
}) => {
  const wandColor = getDifficultyColor(difficulty);
  return (
    <div className="controls">
      <div className="left">
        <div className="control-group">
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            onChange={(e) => onLanguageChange(e.target.value as Language)}
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
            onChange={(e) => onThemeChange(e.target.value as Theme)}
            value={theme}
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>

      <div className="right">
        {language === "javascript" && (
          <Wand
            size={32}
            absoluteStrokeWidth
            color={wandColor}
            onClick={handleFormat}
          />
        )}
        <button className="run-button" onClick={handleRun} disabled={loading}>
          {loading ? "Running..." : "Run Code"}
        </button>
      </div>
    </div>
  );
};

export default CodeControls;
