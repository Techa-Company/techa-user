"use client";
import React, { useState } from "react";
import MonacoTabItem from "./MonacoTabItem";
import useTabsStore from "../stores/tabSlice";
import { BsPlus } from "react-icons/bs";
import { ReactTemplateDefaults } from "@/app/_assets/_utils/reactTemplateConsts";
import useModalStore from "../stores/modalSlice";

const MonacoTabsHeader: React.FC = () => {
  const { tabs, activeTabName, setActiveTabName, decrement, createTab } =
    useTabsStore();
  const [isAddingNewTab, setIsAddingNewTab] = useState(false);
  const { setModalVisibility } = useModalStore();
  const handleTabClick = (tabName: string) => {
    setActiveTabName(tabName);
  };

  const handleTabClose = (tabName: string) => {
    const tab = tabs.find((tab) => tab.name === tabName);
    if (tab && !tab.isEdited) {
      if (tabs.length == 1)
        createTab({ code: "sample code", name: "Sample.jsx" });
      decrement(tab.name);
    } else {
      setActiveTabName(tabName);
      setModalVisibility("isSaveDialogModalVisible", true);
    }
  };

  const handleInputAction = () => {
    setModalVisibility("isNewTabModalVisible", true);

    // Add your desired action here
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleInputAction();
    }
  };

  const handleBlur = () => {
    handleInputAction();
  };
  return (
    <>
      {tabs.length > 0 && (
        <div className="w-full border-b border-[#373737] h-8 flex items-center">
          {tabs.map((tab, index) => (
            <MonacoTabItem
              key={"tab.index" + index}
              name={tab.name}
              isEdited={tab.isEdited ?? false}
              code={tab.code}
              id={tab.id}
              isActive={tab.name === activeTabName}
              index={index as number}
              onClickHandler={() => handleTabClick(tab.name)}
              onClickClose={() => handleTabClose(tab.name)}
            />
          ))}

          <button className="rounded-md text-gray-600 p-0.5 ml-1.5">
            <BsPlus
              size={21}
              className="text-[#808080] hover:bg-white/10  rounded-md"
              onClick={(e) => {
                setModalVisibility("isNewTabModalVisible", true);
              }}
            />
          </button>
        </div>
      )}
    </>
  );
};

export default MonacoTabsHeader;
