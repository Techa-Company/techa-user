import React from "react";
import {
  BiBookOpen,
  BiDockTop,
  BiImport,
  BiIntersect,
  BiMenu,
  BiSolidSave,
} from "react-icons/bi";
import { BsSearch, BsWindowDock } from "react-icons/bs";
import HeaderItem from "../header/HeaderItem";

const LayoutTop = ({
  isWidgetSearchVisible,
  setWidgetSearchVisible,
  dockClickHandler,
  dragDisabled,
  fileName,
  onClickComponentsHandler,
  onClickSaveHandler,
  onClickImportHandler,
  onClickSPHandler,
  toggleMenu,
}) => {
  return (
    <div className="fixed z-[5645] border-b border-[#373737] flex justify-between w-screen max-w-full  items-start handle py-1 pl-2 pr-4 bg-[#1f1f1f] text-sm text-[#fff] overflow-clip ">
      <button
        onClick={dockClickHandler}
        className="my-auto border border-white/30 hover:bg-gray-700 rounded-lg  text-[#cccccc]  px-1.5 py-1.5"
      >
        {dragDisabled ? <BsWindowDock size={19} /> : <BiDockTop size={19} />}
      </button>

      <div
        onClick={() => setWidgetSearchVisible(!isWidgetSearchVisible)}
        className="border border-[#9d9d9d]/25 text-xs rounded-lg px-0.5 py-1.5 w-[250px] md:w-[38vw] mx-auto my-auto flex justify-center items-center bg-[#ffffff0d] hover:bg-[#ffffff11] cursor-pointer hover:"
      >
        <BsSearch size={11} className="leading-tight mx-1" />
        <div className="flex justify-center items-center ">{fileName}</div>
      </div>
      <div className=" mx-1 hidden lg:flex">
        <HeaderItem
          icon={<BiIntersect size={19} />}
          onClick={onClickSPHandler}
          title={"API"}
        />

        <HeaderItem
          icon={<BiBookOpen size={19} />}
          onClick={onClickComponentsHandler}
          title={"Components"}
        />
        <HeaderItem
          icon={<BiSolidSave size={19} />}
          onClick={onClickSaveHandler}
          title={"Save"}
        />
        <HeaderItem
          icon={<BiSolidSave size={19} />}
          onClick={onClickSaveHandler}
          title={"Save as"}
        />
        <HeaderItem
          icon={<BiImport size={19} />}
          onClick={onClickImportHandler}
          title={"Import"}
        />
        <HeaderItem
          icon={
            dragDisabled ? <BsWindowDock size={19} /> : <BiDockTop size={19} />
          }
          onClick={dockClickHandler}
          title={dragDisabled ? "Dock" : "Undock"}
        />
      </div>

      <button
        onClick={toggleMenu}
        className="flex lg:hidden my-auto border border-white/30 hover:bg-gray-700 rounded-lg  text-[#cccccc]  p-1"
      >
        <BiMenu size={25} />
      </button>
    </div>
  );
};

export default LayoutTop;
