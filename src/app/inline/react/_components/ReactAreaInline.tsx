// components/ReactAreaNew.tsx
import React, { useEffect, useState, useRef } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import Draggable from "react-draggable";
import dynamic from "next/dynamic";
import MonacoTabsHeader from "./editorTabs/MonacoTabsHeader";
import MonacoEditorComponent from "./MonacoEditorComponent";
import PageInitializer from "./PageInitializer";

import { useAuth } from "../../../../components/contexts/AuthContext";
import {
  GetReactTemplateById,
  GetTemplateById,
} from "../../../../api/handlers/InlineReactHandler";
import { useParams } from "next/navigation";
import {
  ReactTemplateDisplayDTO,
  TemplateDisplayDTO,
} from "../../../../api/types/dtos/InlineReactDtos";
import TemplateDisplayComponent from "./TemplateDisplayComponent";
import { useQueryState } from "nuqs";

const initialScope = {
  React,
  dynamic,
  // other dependencies
};

declare const window: { [key: string]: any };

window["React"] = React;

interface ReactAreaNewProps {
  isPreview?: boolean;
}

const ReactAreaNew: React.FC<ReactAreaNewProps> = ({ isPreview }) => {
  const [code, setCode] = useState<string>("");
  const [isDocked, setIsDocked] = useState<boolean>(false);
  const [component, setComponent] = useState<TemplateDisplayDTO>();
  const [error, setError] = useState("Loading...");
  const { reactId } = useParams();
  const { "0": isInline } = useQueryState<boolean>("isInline", {
    defaultValue: false,
    parse: Boolean,
  });
  const dragRef = useRef<Draggable>(null);
  if (!reactId) return;
  const tutorialId = parseInt(reactId as string);
  useEffect(() => {
    GetTemplateById(tutorialId).then((res) => {
      if (res.data.IsSuccess) {
        if (res.data.Data.TemplateType != 2) {
          setError("Snippet Not Found!");
        } else {
          setError("");
          setComponent(res.data.Data);
          setCode(res.data.Data.Script);
        }
      }
    });
  }, []);
  if (error)
    return <div className="h-full w-full text-white text-lg">{error}</div>;
  const setCodeHandler = (newCode: string) => {
    setCode(newCode);
  };

  return !isPreview ? (
    <LiveProvider scope={initialScope} code={code} noInline>
      <Draggable
        disabled={!isDocked}
        ref={dragRef}
        handle=".drag-handle"
        defaultClassName={`${isDocked ? "absolute z-[49]" : "relative"} ${
          isInline && "p-3"
        } max-h-3xl flex flex-col bg-[#141414] select-none`}
      >
        <div className="h-full w-full max-sm:w-full mx-auto flex flex-col overflow-clip text-white">
          <div className="flex max-lg:flex-col h-full w-full relative">
            <div className="w-full lg:w-[70%] max-lg:h-screen h-screen  flex-col">
              <MonacoTabsHeader />
              <MonacoEditorComponent code={code} setCode={setCodeHandler} />
            </div>
            <div className="w-[30%] h-full p-2 pr-4">
              <TemplateDisplayComponent
                data={component as TemplateDisplayDTO}
              />
            </div>
          </div>
        </div>
      </Draggable>
      <div className="w-full h-full text-white p-1.5">
        <LiveError />
      </div>
      <div className="w-screen max-h-screen h-screen relative block">
        <LivePreview />
      </div>
    </LiveProvider>
  ) : (
    <LiveProvider scope={initialScope} code={code} noInline>
      <LivePreview />
    </LiveProvider>
  );
};

export default ReactAreaNew;
