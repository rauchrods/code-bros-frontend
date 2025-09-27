import { Editor, type Theme } from "@monaco-editor/react";
import type { Language } from "../types";

interface CodeEditorProps {
  language: Language;
  code: string;
  onChange: (value: string | undefined) => void;
  theme: Theme;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language = "javascript",
  code,
  onChange,
  theme,
}) => {
  return (
    <div className="code-editor">
      <Editor
        height="70vh"
        width="100%"
        language={language}
        value={code}
        theme={theme}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
