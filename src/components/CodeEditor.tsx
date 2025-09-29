import { Editor, type Theme } from "@monaco-editor/react";
import type { Language } from "../types";
import { forwardRef, useImperativeHandle, useRef } from "react";
import type * as Monaco from "monaco-editor";

interface CodeEditorProps {
  language: Language;
  code: string;
  onChange: (value: string | undefined) => void;
  theme: Theme;
}

export interface CodeEditorRef {
  formatCode: () => void;
}

const CodeEditor = forwardRef<CodeEditorRef, CodeEditorProps>(
  ({ language = "javascript", code, onChange, theme }, ref) => {
    const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

    const handleEditorDidMount = (
      editor: Monaco.editor.IStandaloneCodeEditor
    ) => {
      editorRef.current = editor;
    };

    useImperativeHandle(ref, () => ({
      formatCode: () => {
        if (editorRef.current) {
          editorRef.current.getAction("editor.action.formatDocument")?.run();
        }
      },
    }));

    return (
      <div className="code-editor">
        <Editor
          height="60vh"
          width="100%"
          language={language}
          value={code}
          theme={theme}
          onChange={onChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    );
  }
);

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;
