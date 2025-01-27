import React from "react";

const HeaderItem = ({ onClick, title, icon }) => {
  return (
    <button
      onClick={onClick}
      className=" hover:bg-gray-700  rounded-lg  text-[#cccccc]  px-1.5 py-1.5 m-1  lg:flex  flex items-center text-center"
    >
      <span className="mx-0.5 ">{title}</span>
      {icon}
    </button>
  );
};
//<BiIntersect size={19} />
//#cccccc
export default HeaderItem;
