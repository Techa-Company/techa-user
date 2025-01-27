"use client";
import React, { useState } from "react";
import { TreeNodeProps } from "../../treeView/treenode/TreeNode.types";
import { ProjectDirectoryDisplayDTO } from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";

interface MiniTreeNodeProps {
  item: TreeNodeProps["item"];
  onClick: (id: number) => void;
  selectedDirectoryId?: number;
}

const MiniTreeNode: React.FC<MiniTreeNodeProps> = ({
  item,
  onClick,
  selectedDirectoryId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    onClick(item.ItemProps.Id);
    handleToggle();
  };

  const isSelected = selectedDirectoryId === item.ItemProps.Id;
  if (!(item.ItemProps as ProjectDirectoryDisplayDTO).ProjectId) return null;
  return (
    <div className="py-0.5 ">
      <div
        className={`cursor-pointer px-1 flex ${
          isSelected ? "bg-blue-500 text-white" : "text-gray-200"
        }`}
        onClick={handleClick}
      >
        {(item.ItemProps as ProjectDirectoryDisplayDTO).ProjectId && (
          <svg
            className={`w-6 h-6 mr-2 text-yellow-400 transform transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        )}
        {item.ItemProps.Title}
      </div>
      {isOpen && item.items.length > 0 && (
        <div className="pl-2 text-gray-400">
          {item.items.map((subItem) => (
            <MiniTreeNode
              key={subItem.ItemProps.Id}
              item={subItem}
              onClick={onClick}
              selectedDirectoryId={selectedDirectoryId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MiniTreeNode;
