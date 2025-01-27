"use client";
import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";

import { GetHtmlSnippetByIdApiHandler } from "../../../../api/handlers/InlineHtmlHandler";
import { HtmlSnippetDisplayDTO } from "../../../../api/types/dtos/InlineHtmlDtos";

interface HtmlPreviewProps {
  tutorialID: number;
}

const HtmlPreview: React.FC<HtmlPreviewProps> = ({ tutorialID }) => {
  const [code, setCode] = useState("<div>Loading...</div>");
  const [isExecutionMode, setExecutionMode] = useState(false);

  useEffect(() => {
    // Mocked API call function, replace with actual data retrieval
    fetchHtmlSnippet(tutorialID).then((htmlSnippet) => {
      if (!htmlSnippet) return;
      setCode(htmlSnippet.Script);
    });
  }, [tutorialID]);

  // Toggle execution mode to enable editing and live preview
  const toggleExecutionMode = () => {
    setExecutionMode((prev) => !prev);
  };

  return (
    <div
      dir="ltr"
      className="flex z-50 flex-col w-max p-4 space-y-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md"
    >
      {isExecutionMode && (
        <button
          className="ml-auto text-black hover:text-black/60"
          onClick={toggleExecutionMode}
        >
          x
        </button>
      )}
      <h2 className="text-lg font-semibold mb-2">HTML Snippet Editor</h2>

      {/* Execute Online Button */}

      {/* Code Editor with Line Count */}
      {/* Code Editor with Line Numbers */}
      <MonacoEditor
        height="200px"
        language="html"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          readOnly: !isExecutionMode,
          lineNumbers: "on",
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />

      {/* Live HTML Preview */}
      {isExecutionMode && (
        <div
          className="p-4 mt-4 border border-gray-200 rounded-md bg-white shadow-sm"
          dangerouslySetInnerHTML={{ __html: code }}
        ></div>
      )}
      <button
        onClick={toggleExecutionMode}
        className="self-end px-3 py-1 rounded-md bg-slate-200 hover:bg-cyan-300/50 shadow-sm"
      >
        {isExecutionMode ? "Close Execution" : "اجرای برخط"}
      </button>
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
