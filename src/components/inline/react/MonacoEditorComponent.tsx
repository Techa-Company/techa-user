"use client";

import { Monaco, Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { configureMonacoTailwindcss } from "monaco-tailwindcss";

interface MonacoEditorComponentProps {
  code: string;
  setCode: (code: string) => void;
}

const MonacoEditorComponent: React.FC<MonacoEditorComponentProps> = ({
  code,
  setCode,
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

  const onMountTailwindInject = (editor: Monaco) => {
    // فقط configureMonacoTailwindcss را فراخوانی کن
    configureMonacoTailwindcss(editor);

    setEditorInstance(editor);
  };

  return (
    <div className="w-full h-full relative">
      <MonacoEditor
        value={code}
        options={{
          quickSuggestions: { other: true, comments: true, strings: true },
          inlineSuggest: { enabled: true },
          contextmenu: true,
        }}
        onChange={(e) => setCode(e || "")}
        beforeMount={onMountTailwindInject}
        language="javascript"
        theme="vs-dark"
        className="h-full"
      />
    </div>
  );
};

export default MonacoEditorComponent;
