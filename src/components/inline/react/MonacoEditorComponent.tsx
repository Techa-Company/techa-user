"use client";

import { useEffect, useState } from "react";
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import { configureMonacoTailwindcss } from "monaco-tailwindcss";

interface MonacoEditorComponentProps {
  code: string;
  setCode: (code: string) => void;
  language?: "javascript" | "typescript" | "css" | "html";
}

const MonacoEditorComponent: React.FC<MonacoEditorComponentProps> = ({
  code,
  setCode,
  language = "javascript",
}) => {
  const [editorInstance, setEditorInstance] = useState<Monaco | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.MonacoEnvironment = {
        getWorker(moduleId, label) {
          switch (label) {
            case "css":
            case "less":
            case "scss":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/css/css.worker",
                  import.meta.url
                )
              );
            case "html":
            case "handlebars":
            case "razor":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/html/html.worker",
                  import.meta.url
                )
              );
            case "json":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/json/json.worker",
                  import.meta.url
                )
              );
            case "javascript":
            case "typescript":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/typescript/ts.worker",
                  import.meta.url
                )
              );
            case "tailwindcss":
              return new Worker(
                new URL(
                  "monaco-tailwindcss/tailwindcss.worker",
                  import.meta.url
                )
              );
            default:
              throw new Error(`Unknown label ${label}`);
          }
        },
      };
    }
  }, []);

  const handleEditorMount = (editor: Monaco) => {
    configureMonacoTailwindcss(editor); // Tailwind autocomplete بدون ارور
    setEditorInstance(editor);
  };

  return (
    <div className="w-full h-full relative">
      <MonacoEditor
        value={code}
        language={language}
        theme="vs-dark"
        beforeMount={handleEditorMount}
        onChange={(value) => setCode(value || "")}
        options={{
          quickSuggestions: { other: true, comments: true, strings: true },
          inlineSuggest: { enabled: true },
          contextmenu: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
        className="h-full w-full"
      />
    </div>
  );
};

export default MonacoEditorComponent;
