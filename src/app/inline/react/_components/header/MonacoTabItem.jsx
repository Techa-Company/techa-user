import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setActiveIndex } from "../../stores/activeIndexSlice";
import {
  decrement,
  getFirst,
  selectFirstItem,
  setCurrentCode,
} from "../../stores/tabsSlice";
const MonacoTabItem = ({ isActive, index, name, code }) => {
  const activeIndex = useSelector((state) => state.activeIndex);
  const tabs = useSelector((state) => state);

  const dispatch = useDispatch();
  const onClickClose = () => {
    dispatch(decrement({ name }));
  };
  const onClickHandler = () => {
    dispatch(setCurrentCode({ activeIndex, code }));
    dispatch(setActiveIndex(index));
  };

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
      ${isActive ? "bg-[#1e1e1e]" : "bg-[#121212]"} 
      border-x ${isActive ? "border-t" : "border-y"}  
      border-[#373737]
      px-2 ${isActive && "mt-0.5"} z-[500]`}
      onClick={onClickHandler}
    >
      <span className=" mx-2">[{name}]</span>
      <FiX
        size={21}
        className="text-[#808080] group-hover:opacity-100 opacity-0 hover:bg-white/10 p-0.5 rounded-md"
        onClick={onClickClose}
      />
    </div>
  );
};

export default MonacoTabItem;
