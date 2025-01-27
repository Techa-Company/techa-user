"use client";
import React from "react";
import { FaCircle } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import useTabsStore from "../stores/tabSlice";
import usePageDataStore from "../stores/pageDataSlice";

interface MonacoTabItemProps {
  id?: number;
  name: string;
  code: string;
  isActive: boolean;
  isEdited: boolean;
  index: number;
  onClickHandler: () => void;
  onClickClose: (index: number) => void;
}

const MonacoTabItem: React.FC<MonacoTabItemProps> = ({
  name,
  isActive,
  onClickHandler,
  onClickClose,
  isEdited,
  index,
  id,
}) => {
  const { pageData } = usePageDataStore();
  return (
    <div
      className={`
        group text-sm 
        h-full w-max  
        select-none 
        cursor-pointer
        
        ${!isActive && "hover:bg-white/10"} 
        flex items-center 
        justify-between 
        ${
          id != pageData?.componentId
            ? isActive
              ? "bg-[#1e1e1e]"
              : "bg-[#121212]"
            : isActive
            ? "bg-[#3c1e3a]"
            : "bg-[#430043]"
        } 
        border-x ${isActive ? "border-t" : "border-y"}  
        border-[#373737]
        px-2 ${isActive && "mt-0.5"} z-[49]`}
      onClick={onClickHandler}
    >
      <span className={`mx-2 ${isActive ? "font-[300]" : "font-[50]"}`}>
        [{name}]
      </span>
      <span className="w-4 h-full flex items-center justify-center rounded-md">
        {isEdited && (
          <FaCircle
            size={10}
            className="static text-gray-500 mx-auto group-hover:hidden"
          />
        )}
        <FiX
          size={21}
          className="static hidden group-hover:block text-[#808080] group-hover:opacity-100 opacity-0 hover:bg-white/10 p-0.5 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            onClickClose(index);
          }}
        />
      </span>
    </div>
  );
};

export default MonacoTabItem;
