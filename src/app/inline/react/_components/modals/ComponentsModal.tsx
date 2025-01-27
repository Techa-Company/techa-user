import React, { useState } from "react";
import ComponentItem from "./ComponentItem";
import { BiSearchAlt } from "react-icons/bi";
import TreeView from "./TreeView";
import useComponentStore from "../stores/componentSlice";
import useModalStore from "../stores/modalSlice";

const ComponentsModal = () => {
  const [filterString, setFilterString] = useState("");
  const [isTreeView, setTreeView] = useState(false);
  const { isComponentsModalVisible: isOpen, setModalVisibility } =
    useModalStore();
  const setVisibility = (visibility: boolean) =>
    setModalVisibility("isComponentsModalVisible", visibility);

  const toggleViewHandler = () => {
    setTreeView(!isTreeView);
  };
  const { components } = useComponentStore();

  const filteredComponents =
    filterString.length > 0
      ? components.filter(
          (c) =>
            c.Title.toLowerCase().includes(filterString.toLowerCase()) ||
            c.Id.toString().includes(filterString.toLowerCase())
        )
      : components;

  if (!isOpen) return null;

  return (
    <div className="fixed w-screen h-screen z-50 flex items-center justify-center text-center overflow-y-scroll ">
      <div
        className="fixed w-screen h-screen bg-gray-800/50 z-10"
        onClick={() => setVisibility(false)}
      />
      <div className="w-4/5 h-5/6 bg-[#1f1f1f] rounded-xl shadow-lg z-20 overflow-x-scroll overflow-y-scroll">
        <div className="w-full flex justify-between items-center">
          <div className="relative max-w-lg p-2 flex w-1/2 mt-2 ml-3.5">
            <input
              type="text"
              value={filterString}
              id="inp"
              onChange={(e) => setFilterString(e.target.value)}
              placeholder="Search or Filter"
              className="bg-white border border-gray-300 rounded-full py-2 px-4 block w-full appearance-none leading-5 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <div className="absolute inset-y-0 right-1 pr-3 flex items-center">
              <BiSearchAlt size={24} className="opacity-70" />
            </div>
          </div>
          <div className="  border-2 border-amber-400 rounded-lg flex mr-3.5 justify-around cursor-pointer">
            <div
              className={`text-xs rounded-l-lg p-2 ${
                isTreeView && "bg-amber-300"
              }`}
              onClick={() => setTreeView(true)}
            >
              Tree{" "}
            </div>
            <span className="h-8 pl-0.5 bg-black/10" />
            <div
              className={`text-xs rounded-r-lg p-2 ${
                !isTreeView && "bg-amber-300"
              }`}
              onClick={() => setTreeView(false)}
            >
              List
            </div>
          </div>
        </div>
        {!isTreeView ? (
          <ul className="flex flex-auto justify-around flex-wrap">
            {components &&
              filteredComponents.map((c) => <ComponentItem component={c} />)}
          </ul>
        ) : (
          <TreeView components={components} />
        )}
      </div>
    </div>
  );
};

export default ComponentsModal;
