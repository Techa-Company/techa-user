// HeaderItem.tsx
import React from "react";

interface HeaderItemProps {
  icon: React.ReactNode;
  onClick?: () => void;
  title: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({ icon, onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center max-md:hidden space-x-2 p-2 hover:bg-gray-700  text-[#cccccc]"
      title={title}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

export default HeaderItem;
