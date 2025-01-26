// components/ReactAreaNew.tsx
import React, { useEffect, useState, useRef } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Draggable from "react-draggable";
import dynamic from "next/dynamic";
import SaveFileModal from "./modals/SaveFileModal";
import ImportsModal from "./modals/import/ImportsModal";
import StoredProceduresModal from "./modals/StoredProceduresModal";
import Header from "./header/Header";
import MonacoTabsHeader from "./editorTabs/MonacoTabsHeader";
import MonacoEditorComponent from "./MonacoEditorComponent";
import Tree from "./treeView/Tree";
import FloatedHeader from "./header/FloatedHeader";
import PageInitializer from "./PageInitializer";
import NewTabModal from "./modals/newtab/NewTabModal";
import SaveDialogModal from "./modals/SaveDialogModal";
import useModalStore from "./stores/modalSlice";
import useTabsStore from "./stores/tabSlice";
import { useQueryState } from "nuqs";
import ComponentsModal from "./modals/ComponentsModal";
import ProjectSelector from "./layout/ProjectSelector";
import useComponentStore from "./stores/componentSlice";
import { compileAndRenderJSX } from "../../../../components/inline/utils/lib";
import usePageDataStore from "./stores/pageDataSlice";
import CdnLinksBox from "./widgets/CdnLinksBox";
import ChooseDatabaseModal from "./modals/ChooseDatabaseModal";

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
  const {
    isImportModalVisible,
    isSPModalVisible,
    isSaveModalVisible,
    setModalVisibility,
  } = useModalStore();
  const { activeTabName, currentTab, setCurrentCode } = useTabsStore();
  const { components } = useComponentStore();
  const { addedProperties, setAddedProperties, projects, setProjects } =
    usePageDataStore();
  const [code, setCode] = useState<string>("");
  const [projectId, setProjectId] = useQueryState("project");
  const [isDocked, setIsDocked] = useState<boolean>(false);
  const [isInline, setIsInline] = useState<boolean>(false);
  const [isFlotedHeaderVisible, setFloatedHeaderVisible] =
    useState<boolean>(false);
  const dragRef = useRef<Draggable>(null);

  const dockClickHandler = () => {
    if (dragRef.current) {
      const draggableElement = dragRef.current;
      draggableElement.setState({
        x: isDocked ? 0 : 250,
        y: isDocked ? 0 : 250,
      });
    }
    setIsDocked(!isDocked);
  };

  useEffect(() => {
    if (activeTabName) {
      const currentCode = currentTab().code;
      currentCode && setCode(currentCode);

      if (currentTab().id) {
        const component = components.find((x) => x.Id == currentTab().id);
        if (component && component.RelatedTemplates) {
          try {
            component.RelatedTemplates.forEach((c) => {
              const componentName = c.ChildTitle.split(".")[0];
              const compiledComponent = compileAndRenderJSX(c.ChildScript);
              if (compiledComponent && componentName) {
                (window as any)[componentName] = compiledComponent;
                setAddedProperties([...addedProperties, componentName]);
              }
            });
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  }, [activeTabName]);
  useEffect(() => {
    if (!projectId) return;
    const currentProject = projects.find((p) => p.Id == parseInt(projectId));
    if (currentProject && !currentProject.StudentDBId)
      setModalVisibility("isChooseDatabaseModalVisible", true);
  }, [projectId, projects]);
  const setCodeHandler = (newCode: string) => {
    setCurrentCode(newCode, currentTab().name);
    setCode(newCode);
  };

  return !isPreview ? (
    <LiveProvider scope={initialScope} code={code} noInline>
      <PageInitializer username="yourUsernameHere" isPreview={isPreview} />
      {isSaveModalVisible && (
        <SaveFileModal
          code={code}
          name={(currentTab() && currentTab().name) || "Component.jsx"}
        />
      )}
      {isImportModalVisible && <ImportsModal CdnLinks={[]} Id={undefined} />}
      {isSPModalVisible && <StoredProceduresModal onAddClick={() => {}} />}
      <CdnLinksBox />
      <NewTabModal />
      <SaveDialogModal />
      <ComponentsModal />
      <ChooseDatabaseModal />
      <Draggable
        disabled={!isDocked}
        ref={dragRef}
        handle=".drag-handle"
        defaultClassName={`${
          isDocked ? "absolute z-[49]" : "relative"
        }  max-h-3xl flex flex-col bg-[#141414] select-none`}
      >
        <div className="h-full w-full max-sm:w-full mx-auto flex flex-col overflow-clip text-white">
          <div className="w-full text-sm flex items-center border-b border-b-background px-1.5 drag-handle">
            {isFlotedHeaderVisible && (
              <FloatedHeader setVisible={setFloatedHeaderVisible} />
            )}
            <Header isDocked={isDocked} setIsDocked={dockClickHandler} />
            <div className="w-full h-6  md:hidden px-1 ">
              {!isFlotedHeaderVisible ? (
                <FiMenu
                  className="hover:text-violet-600 ml-auto"
                  size={21}
                  onClick={() => setFloatedHeaderVisible(true)}
                />
              ) : (
                <MdClose
                  className="hover:text-violet-600 ml-auto"
                  size={21}
                  onClick={() => setFloatedHeaderVisible(false)}
                />
              )}
            </div>
            <div className="ml-auto mr-4">
              <ProjectSelector />
            </div>
          </div>
          <div className="flex max-lg:flex-col h-full w-full relative">
            <div className="w-full flex">
              {!isInline && (
                <div className="h-full w-64 flex-col flex">
                  <Tree />
                </div>
              )}
              <div className="w-full lg:w-[70%] max-lg:h-screen h-screen  flex-col">
                <MonacoTabsHeader />
                <MonacoEditorComponent code={code} setCode={setCodeHandler} />
              </div>
            </div>
            <div className="w-screen max-h-screen lg:hidden">
              <LivePreview />
            </div>
          </div>
        </div>
      </Draggable>
      <div className="w-full p-1.5">
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
