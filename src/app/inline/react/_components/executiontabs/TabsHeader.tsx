import React from "react";
interface TabsHeaderProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}
const TabsHeader: React.FC<TabsHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-2 overflow-x-scroll mb-4  small-scrollbar ">
      {["Error", "Console", "My Components", "Exercises"].map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(index)}
          className={`text-sm px-4 py-1.5 rounded-t-lg text-nowrap ${
            activeTab === index
              ? "bg-white text-violet-700 font-bold"
              : "bg-violet-200 text-violet-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabsHeader;
