"use client";
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import Draggable from "react-draggable";
import { FiX } from "react-icons/fi";
import "react-resizable/css/styles.css";
import { BiSolidSave, BiImport, BiIntersect, BiBookOpen } from "react-icons/bi";
import SaveFileModal from "./components/modals/SaveFileModal";
import ImportsModal from "./components/modals/import/ImportsModal";
import axios from "../../../_api/_handlers/axiosInstance";
import StoredProceduresModal from "./components/modals/StoredProceduresModal";
import ComponentsModal from "./components/modals/ComponentsModal";

import "./index.css";
import dynamic from "next/dynamic";

import NavHamItem from "./components/header/NavHamItem";
import MonacoTabItem from "./components/header/MonacoTabItem";
import WidgetSearch from "./components/widgets/WidgetSearch";
import LayoutTop from "./components/layout/LayoutTop";
import { useDispatch, useSelector } from "react-redux";
import { createTab } from "./stores/tabsSlice";
import { setActiveIndex } from "./stores/activeIndexSlice";
import * as ReactIcons from "react-icons/fa6";
import { useParams } from "next/navigation";
import { getReactTemplate } from "@/app/_assets/_api/_handlers/InlineReactHandler";
import { useAuth } from "@/app/_assets/_components/contexts/AuthContext";
// Some of Variables come from Asp.net Viewbags, they're defined in the Index.cshtml of ReactTest (Tutorial Area)

const MonacoEditorComponent = dynamic(
  () => import("./components/MonacoEditorComponent"),
  { ssr: false }
);

const initialScope = {
  React,
  ReactDOM,
  useRef,
  axios,
  ReactIcons,
  // Initialize other dependencies
};

const ReactArea = () => {
  const [scope, setScope] = useState(initialScope);
  const [dragDisabled, setDragDisabled] = useState(true);
  const { reactId: ReactId } = useParams();
  const [pageData, setPageData] = useState({
    defaultCode: `const Hi = () => <h1 className={""}>Hello</h1>
render(<Hi/>)`,
    templateName: "",
    storedProcedures: [],
    showPreview: false,
  });
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMain, setIsMain] = useState(false);
  /* Modals */
  const [isSaveModalVisible, setSaveModalVisible] = useState(false);
  const [isImportModalVisible, setImportModalVisible] = useState(false);
  const [isSPModalVisible, setSPModalVisible] = useState(false);
  const [isComponentsModalVisible, setComponentsModalVisible] = useState(false);
  /* Modals End */
  const [code, setCode] = useState(pageData.defaultCode);
  const tabs = useSelector((state) => state.tabs);
  const dispatch = useDispatch();
  const activeIndex = useSelector((state) => state.activeIndex);

  const [isWidgetSearchVisible, setWidgetSearchVisible] = useState(false);

  const dragRef = useRef();

  const onConfirmOverwriteHandler = () => {
    // Find and remove import lines
    const modifiedCodeWithoutImports = code.replace(
      /import .* from '.*';/g,
      ""
    );

    // Replace the export statement with the templateName without the file extension
    const modifiedCode = modifiedCodeWithoutImports.replace(
      /export default /,
      ""
    );

    let params;
    if (componentType === "usercomponent") {
      params = {
        name: templateName,
        code: modifiedCode,
        componentType: "usercomponent",
      };
    } else if (componentType === "tutorialcomponent") {
      params = {
        componentId: fileId,
        code: modifiedCode,
        componentType: "tutorialcomponent",
      };
    }
    try {
      axios
        .post(`ReactTest/component/overwrite`, {
          ...params,
        })
        .then((res) => {
          alert("Success");
        })
        .catch((req) => {
          console.log("Error: ", res);
        })
        .finally(() => {});
    } catch (error) {
      console.error(error);
    }
  };

  const dockClickHandler = () => {
    if (dragRef.current) {
      if (!dragDisabled) dragRef.current.state.x = dragRef.current.state.y = 0;
      else dragRef.current.state.x = dragRef.current.state.y = 250;
    }
    setDragDisabled(!dragDisabled);
  };
  const onClickSaveHandler = () => {
    setSaveModalVisible(true);
  };
  const onClickImportHandler = () => {
    setImportModalVisible(true);
  };
  const onClickSPHandler = () => {
    setSPModalVisible(true);
  };
  const onClickComponentsHandler = () => {
    setComponentsModalVisible(true);
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const menuStyle = {
    transform: isOpen ? "translateX(0)" : "translateX(100vw)",
  };
  const addStoredProcedureHandler = (procedure) => {
    const { name: storedProcedureName, parameterNames } = procedure;
    // Remove '@' from the parameter names
    const cleanedParameterNames = parameterNames.map((paramName) =>
      paramName.replace(/^@/, "")
    );

    const newHandlerCode = `
      const ${storedProcedureName}Handler = () => {
        const requestData = {
          StoredProcedureName: "${storedProcedureName}",
          Parameters: {
  ${cleanedParameterNames
    .map((paramName) => `          ${paramName}: ${paramName}`)
    .join(",\n")}
          },
        };
        axios.post("/reacttest/api/sp/execute", requestData).then((res) => {
          console.log(res);
        });
      };

      // You can add any additional code or logic here as needed

    `;

    setCode((prevCode) => prevCode + newHandlerCode);
  };
  const onEditorCodeChangeHandler = (e) => {
    setCode(e);
  };

  useEffect(() => {
    window.React = React;
    window.ReactDOM = ReactDOM;
    if (pageData.defaultCode == "" && user) {
      getReactTemplate(ReactId).then((res) => {
        setPageData({
          ...pageData,
          defaultCode: "res.data.Data.Script",
          templateName: "Sample",
        });
      });
    }
    const sameTab = tabs.find((tab) => tab.name == pageData.templateName);
    if (sameTab == null) {
      dispatch(
        createTab({
          component: {
            name: pageData.templateName,
            code: pageData.defaultCode,
            id: -1,
          },
        })
      );
      dispatch(setActiveIndex(-1));
    }
    return () => {};
  }, []);
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.index == activeIndex);
    if (currentTab) setCode(currentTab.code);
    try {
      if (currentTab.isMain != null) setIsMain(true);
      else setIsMain(false);
    } catch (error) {
      console.log(error);
    }
  }, [activeIndex]);
  return !pageData.showPreview ? (
    <LiveProvider scope={scope} code={code} noInline>
      {isSaveModalVisible && (
        <SaveFileModal
          code={code}
          name={tabs.find((tab) => tab.index == activeIndex).name}
          setVisibility={setSaveModalVisible}
        />
      )}
      {isImportModalVisible && (
        <ImportsModal setVisibility={setImportModalVisible} />
      )}
      {isSPModalVisible && (
        <StoredProceduresModal
          setVisibility={setSPModalVisible}
          procedures={storedProcedures}
          onAddClick={addStoredProcedureHandler}
        />
      )}
      {isComponentsModalVisible && (
        <ComponentsModal setVisibility={setComponentsModalVisible} />
      )}
      <Draggable
        ref={dragRef}
        disabled={dragDisabled}
        handle=".handle"
        defaultClassName={`${
          !dragDisabled ? "absolute" : "relative"
        }  max-h-3xl flex flex-col`}
      >
        <div className="flex flex-col h-full">
          <div className={`flex flex-col h-full`}>
            <LayoutTop
              dockClickHandler={dockClickHandler}
              dragDisabled={dragDisabled}
              templateName={pageData.templateName}
              setWidgetSearchVisible={setWidgetSearchVisible}
              isWidgetSearchVisible={isWidgetSearchVisible}
              onClickComponentsHandler={onClickComponentsHandler}
              onClickImportHandler={onClickImportHandler}
              onClickSPHandler={onClickSPHandler}
              onClickSaveHandler={onClickSaveHandler}
            />
            <div className="flex mt-[3.1rem]  h-full">
              <div className="h-full w-[49px] border-r border-gray-700"></div>
              <div
                className={
                  "h-full w-[300px] border-r border-gray-700 fixed left-[49px] bg-[#292929] z-[500] lg:relative " +
                  "hidden"
                }
              >
                s
              </div>
              <div className="flex flex-col h-full">
                {tabs.length > 0 && (
                  <div className="w-full border-b border-[#373737] h-8 flex items-center">
                    {tabs.map((tab) => (
                      <MonacoTabItem
                        name={tab.name}
                        code={code}
                        isActive={tab.index == activeIndex}
                        index={tab.index}
                      />
                    ))}
                  </div>
                )}
                <div className="flex flex-col lg:flex-row z-50 pb-0.5 px-0.5 overflow-clip w-max h-full">
                  <div className="max-w-xl h-full max-h-full">
                    <MonacoEditorComponent
                      code={code}
                      setCode={setCode}
                      dragDisabled={dragDisabled}
                    />
                  </div>
                  <div className="max-w-xl w-screen h-full mr-auto mt-auto bg-[#1e1e1e]">
                    <LiveError
                      className={`lg:w-full  w-screen h-full whitespace-normal  z-10 text-white py-2 px-4`}
                    />
                  </div>
                </div>
                {dragDisabled && <LivePreview className="max-w-full" />}
              </div>
            </div>
          </div>
        </div>
      </Draggable>
      {!dragDisabled && <LivePreview />}
      <ul
        className={`w-full h-screen md:hidden
          fixed bg-[#1a1a1a] z-[10] flex 
          flex-col top-0 left-0 animatedMenu 
          transition-all ${isOpen ? "opacity-100" : "opacity-0"}`}
        dir="rtl"
        style={menuStyle}
      >
        <div className="mx-auto my-6 flex justify-around w-full">
          <div className=""></div>
          Web Application
          <button className="block md:hidden" onClick={toggleMenu}>
            <FiX className="text-3xl" />
          </button>
        </div>

        <NavHamItem
          icon={<BiIntersect />}
          onClick={onClickSPHandler}
          text="API"
        />
        <NavHamItem
          icon={<BiBookOpen />}
          onClick={onClickComponentsHandler}
          text="Components"
        />
        <NavHamItem
          icon={<BiSolidSave />}
          onClick={onClickSaveHandler}
          text="Save as"
        />
        <NavHamItem
          icon={<BiImport />}
          onClick={onClickImportHandler}
          text="Import"
        />
      </ul>
      {isWidgetSearchVisible && (
        <WidgetSearch
          isVisible={isWidgetSearchVisible}
          setVisible={setWidgetSearchVisible}
        />
      )}
    </LiveProvider>
  ) : (
    // IS Preview >>>>>>>>>>>>>>>>>
    <LiveProvider scope={scope} code={code} noInline>
      <LivePreview />
    </LiveProvider>
  );
};

export default ReactArea;
