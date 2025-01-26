"use client";
import { GetHtmlSnippetByIdApiHandler } from "../../../../api/handlers/InlineHtmlHandler";
import { JsSnippetDisplayDTO } from "../../../../api/types/dtos/InlineJsDtos";
import MonacoEditor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

// Props interface
interface JavascriptPreviewProps {
  tutorialID: number;
}

// ConsoleOutput component for displaying logs
export const ConsoleOutput: React.FC<{ output: string }> = ({ output }) => (
  <div
    style={{
      border: "1px solid #ddd",
      marginBlock: "10px",
      padding: "10px",
      height: "150px",
      overflowY: "auto",
      backgroundColor: "#f9f9f9",
    }}
  >
    <pre>{output}</pre>
  </div>
);

// Main JavaScriptPreview component
const JavaScriptPreview: React.FC<JavascriptPreviewProps> = ({
  tutorialID,
}) => {
  const [code, setCode] = useState<string>(
    '<p>Hello World</p><script>console.log("Hello from script!");</script>'
  );
  const [isEditable, setEditable] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [isBoxVisible, setIsBoxVisible] = useState(false); // Track visibility of the box

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const uniqueIdRef = useRef(
    `js-preview-${tutorialID}-${Math.random().toString(36).substring(2, 9)}`
  );

  // Fetch and load initial HTML snippet code
  useEffect(() => {
    fetchJavascriptSnippet(tutorialID).then((res) => {
      if (res) setCode(res.Script);
    });
  }, [tutorialID]);

  // Handle running the HTML/JS code in an iframe and capture console logs
  const runCodeInIframe = () => {
    setConsoleOutput(""); // Clear previous console output

    if (iframeRef.current) {
      // Set iframe source to about:blank to reset its content
      iframeRef.current.src = "about:blank";

      // Allow the iframe to reset before writing new content
      setTimeout(() => {
        if (!iframeRef.current) return;

        const iframeDoc =
          iframeRef.current.contentDocument ||
          iframeRef.current.contentWindow?.document;
        if (!iframeDoc) return;

        // Open and write new content into the iframe
        iframeDoc.open();
        iframeDoc.write(`
          <script>
            (function() {
              const uniqueId = "${uniqueIdRef.current}";
              const originalConsoleLog = console.log;
              console.log = function(...args) {
                window.parent.postMessage({ type: 'console-log', id: uniqueId, message: args.join(' ') }, '*');
                originalConsoleLog.apply(console, args);
              };
            })();
          </script>
          ${code}
        `);
        iframeDoc.close();

        setTimeout(() => {
          const hasContent =
            iframeDoc.body &&
            Array.from(iframeDoc.body.children).filter(
              (child) => child.tagName !== "SCRIPT"
            ).length > 0;

          setIsBoxVisible(hasContent); // Show or hide the box based on content presence
        }, 10); // Brief delay to allow content rendering
      }, 50); // Slightly longer delay to ensure iframe reset is complete
    }
  };

  // Listen for messages from the iframe for capturing console.log outputs
  useEffect(() => {
    const handleConsoleMessage = (event: MessageEvent) => {
      if (
        event.data.type === "console-log" &&
        event.data.id === uniqueIdRef.current
      ) {
        setConsoleOutput(
          (prevOutput) => prevOutput + "\n" + event.data.message
        );
      }
    };

    window.addEventListener("message", handleConsoleMessage);
    return () => window.removeEventListener("message", handleConsoleMessage);
  }, []);

  return (
    <div dir="ltr" className="flex flex-col">
      {/* Code Editor */}
      <MonacoEditor
        height="200px"
        language="html"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          readOnly: !isEditable,
          lineNumbers: "on",
          minimap: { enabled: false },
          automaticLayout: true,
        }}
        theme="vs-light"
      />

      {/* Execution and Editable State Buttons */}
      <div className="mt-2 flex ">
        <button
          onClick={() => setEditable(!isEditable)}
          className="p-2.5 w-36 mt-1.5 rounded-sm shadow-md border bg-slate-200 hover:bg-cyan-300/50"
        >
          {isEditable ? "Done" : "اجرا برخط"}
        </button>
        {isEditable && (
          <button
            onClick={runCodeInIframe}
            className="p-2.5 w-36 ml-2 mt-1.5 rounded-sm shadow-md border bg-blue-200 hover:bg-blue-300"
          >
            Run
          </button>
        )}
      </div>

      {/* HTML Output in iframe */}
      {isEditable && (
        <div className="mt-4 border border-gray-300">
          <iframe
            ref={iframeRef}
            title="JS Preview Output"
            style={{
              width: "100%",
              height: "200px",
              display: isBoxVisible ? "block" : "none",
            }}
          />
        </div>
      )}

      {/* Output Console */}
      {isEditable && <ConsoleOutput output={consoleOutput} />}
    </div>
  );
};

export default JavaScriptPreview;

// Mock API fetch function for demonstration
async function fetchJavascriptSnippet(
  tutorialID: number
): Promise<JsSnippetDisplayDTO | null> {
  const { data } = await GetHtmlSnippetByIdApiHandler(tutorialID);
  return data.IsSuccess ? data.Data : null;
}
