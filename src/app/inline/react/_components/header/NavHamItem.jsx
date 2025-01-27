import React from "react";

const NavHamItem = ({ icon, text, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="w-full  text-lg  flex items-center bg-transparent   my-2 py-1.5 px-4  cursor-pointer"
    >
      <div className="ml-2">{icon}</div>
      <span className="">{text}</span>
    </li>
  );
};

export default NavHamItem;
