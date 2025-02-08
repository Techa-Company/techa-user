"use client";
import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { GetHtmlSnippetByIdApiHandler } from "../../../../api/handlers/InlineHtmlHandler";
import { HtmlSnippetDisplayDTO } from "../../../../api/types/dtos/InlineHtmlDtos";
import { Play, Square, Edit, Terminal, RefreshCw, X } from "lucide-react";

interface HtmlPreviewProps {
  tutorialID: number;
}

const HtmlPreview: React.FC<HtmlPreviewProps> = ({ tutorialID }) => {
  const [code, setCode] = useState("<div>Loading...</div>");
  const [isEditable, setEditable] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchHtmlSnippet(tutorialID);
      if (res) setCode(res.Script);
    };
    fetchData();
  }, [tutorialID]);

  const runCodeInIframe = async () => {
    setIsRunning(true);
    setIframeKey((prev) => prev + 1);
    setIsPreviewVisible(true);

    await new Promise((resolve) => setTimeout(resolve, 50));

    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; padding: 1rem; background: white; }
          </style>
        </head>
        <body>
          ${code}
        </body>
      </html>
    `);
    iframeDoc.close();

    const checkContent = () => setIsRunning(false);
    iframe.onload = checkContent;
  };

  return (
    <div
      className="flex flex-col gap-4 bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700"
      dir="ltr"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-900 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h2 className="text-gray-200 font-semibold text-sm">
            HTML PLAYGROUND
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditable(!isEditable)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors duration-200"
          >
            {isEditable ? (
              <>
                <Square className="w-4 h-4" />
                <span className="text-xs font-medium">Lock</span>
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                <span className="text-xs font-medium">Edit</span>
              </>
            )}
          </button>

          <button
            onClick={runCodeInIframe}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors duration-200"
          >
            {isRunning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span className="text-xs font-medium">RUN</span>
          </button>

          <button
            onClick={() => setIsPreviewVisible(!isPreviewVisible)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span className="text-xs font-medium">
              {isPreviewVisible ? "Close" : "Open"} Preview
            </span>
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="px-4 pb-4">
        <MonacoEditor
          height="300px"
          language="html"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            readOnly: !isEditable,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "off",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            glyphMargin: false,
            folding: false,
            tabSize: 4,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            renderLineHighlight: "none",
          }}
          theme="vs-dark"
          className="rounded-lg overflow-hidden border border-gray-700"
        />
      </div>

      {/* Preview */}
      {isPreviewVisible && (
        <div className="bg-gray-900 mx-4 mb-4 rounded-lg overflow-hidden border border-gray-700">
          <div className="px-4 py-2.5 bg-gray-800 border-b border-gray-700">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Preview
            </h3>
          </div>
          <div className="h-96 relative bg-gray-900">
            <iframe
              key={iframeKey}
              ref={iframeRef}
              title="HTML Preview Output"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

async function fetchHtmlSnippet(
  tutorialID: number
): Promise<HtmlSnippetDisplayDTO | null> {
  const { data } = await GetHtmlSnippetByIdApiHandler(tutorialID);
  return data.IsSuccess ? data.Data : null;
}

export default HtmlPreview;
