"use client";
import { GetTemplateById } from "../../../../api/handlers/InlineReactHandler";
import React, { useEffect, useState } from "react";
import { LiveEditor, LiveProvider } from "react-live";
import InlineReactView from "./InlineReactView";
interface ReactPreviewProps {
  tutorialID: number;
}
const ReactPreview: React.FC<ReactPreviewProps> = ({ tutorialID }) => {
  const [code, setCode] = useState("Loading...");
  const [isInlineViewVisible, setInlineViewVisible] = useState(false);

  useEffect(() => {
    GetTemplateById(tutorialID)
      .then((res) => {
        if (res.data.IsSuccess) {
          if (res.data.Data.TemplateType !== 2) {
            setCode("Snippet Not Found!");
          } else {
            setCode(res.data.Data.Script);
          }
        }
      })
      .catch(() => {
        setCode("Error");
      });
  }, [tutorialID]);

  return (
    <LiveProvider code={code}>
      <div dir="ltr" className="flex flex-col w-full">
        {isInlineViewVisible ? (
          // Inline view component that replaces the editor when button is clicked
          <InlineReactView
            tutorialID={tutorialID}
            setVisibility={setInlineViewVisible}
          />
        ) : (
          <>
            <LiveEditor
              language="javascript"
              tabMode="focus"
              disabled
              className="w-full"
            />
            <button
              onClick={() => setInlineViewVisible(true)}
              className="p-2.5 w-36 mt-1.5 rounded-sm shadow-md border bg-slate-200 hover:bg-cyan-300/50"
            >
              اجرای برخط
            </button>
          </>
        )}
      </div>
    </LiveProvider>
  );
};

export default ReactPreview;
