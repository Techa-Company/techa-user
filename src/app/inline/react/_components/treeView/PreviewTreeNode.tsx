"use client";
import React from "react";
import { FaReact } from "react-icons/fa";
import {
  ProjectDirectoryDisplayDTO,
  ReactTemplateDisplayDTO,
} from "@/app/assets/api/types/dtos/InlineReactDtos";

export interface PreviewTreeNodeProps {
  item: {
    ItemProps: ReactTemplateDisplayDTO | ProjectDirectoryDisplayDTO | any;
  };
}

const PreviewTreeNode: React.FC<PreviewTreeNodeProps> = ({ item }) => {
  return (
    <div
      className={`flex justify-between items-center px-4 py-0.5 text-sm w-full cursor-default select-none opacity-50`}
    >
      <div className="flex items-center">
        {(item.ItemProps as ReactTemplateDisplayDTO).Script ? (
          <svg
            className="w-6 h-6 mr-2 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        ) : (
          <FaReact className="text-blue-500 w-4 h-4 mx-2" />
        )}
        <span className="text-white">{item.ItemProps.Title}</span>
      </div>
    </div>
  );
};

export default PreviewTreeNode;
