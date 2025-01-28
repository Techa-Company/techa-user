"use client";
import React, { useState } from "react";
import { FaTrash, FaReact } from "react-icons/fa";
import PreviewTreeNode from "../PreviewTreeNode";
import useTabsStore from "../../stores/tabSlice";
import { useQueryState } from "nuqs";
import useDirectoryStore from "../../stores/directoriesSlice";
import NewFolderAction from "../NewFolderAction";
import useComponentStore from "../../stores/componentSlice";
import DragAndDropHooks from "./DragAndDropHooks";
import ContextMenu, { ContextMenuProps } from "./ContextMenu";
import ItemActions from "./ItemActions";
import { TreeNodeProps } from "./TreeNode.types";
import { ReactTemplateDisplayDTO } from "@/app/assets/api/types/dtos/InlineReactDtos";

const TreeNode: React.FC<TreeNodeProps> = ({
  item,
  isFolder,
  onClickDelete,
  onMoveItem,
  isAddingFolder,
  setIsAddingFolder,
}) => {
  const { directories, setDirectories } = useDirectoryStore();
  const { components, setComponents } = useComponentStore();
  const [isDirectoryOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = isHovered || isDirectoryOpen;
  const [projectId] = useQueryState("project");

  const [{ isDragging }, dragRef, dropRef] = DragAndDropHooks(
    item,
    isFolder,
    onMoveItem,
    setIsHovered
  );
  const [
    contextMenu,
    setContextMenu,
    contextMenuRef,
    onContextMenu,
    handleClickOutside,
    handleClickMakeMain,
  ] = ContextMenu({ item, isFolder, setComponents });
  const { createTab } = useTabsStore();

  const onClickHandler = () => {
    if (!isFolder) {
      createTab({
        name: item.ItemProps.Title,
        id: item.ItemProps.Id,
        code: (item.ItemProps as ReactTemplateDisplayDTO).Script,
      });
    } else {
      setIsOpen(!isOpen);
    }
  };

  return isDragging ? (
    <PreviewTreeNode item={item} />
  ) : (
    <div
      ref={(node) => {
        dragRef(node);
        dropRef(node);
      }}
      onDragEnter={() => setIsHovered(true)}
      onDragLeaveCapture={() => setIsHovered(false)}
      onContextMenu={onContextMenu as any}
    >
      <ItemActions
        item={item}
        isFolder={isFolder}
        contextMenuRef={contextMenuRef as any}
        handleClickMakeMain={handleClickMakeMain as any}
        handleClickOutside={handleClickOutside as any}
        contextMenu={contextMenu as any}
      />
      <div
        className={`flex justify-between items-center px-4 py-0.5 text-sm w-full cursor-pointer select-none ${
          isFolder ? "bg-gray-800/20" : ""
        } ${
          (item.ItemProps as ReactTemplateDisplayDTO)?.IsMain
            ? "bg-blue-800/30"
            : ""
        } hover:bg-gray-600 active:bg-cyan-600 active:duration-0 transition duration-300 ${
          isHovered ? "bg-green-500/20" : ""
        }`} // Apply drop hover effect
        onClick={onClickHandler}
      >
        <div className="flex items-center">
          {isFolder ? (
            <svg
              className={`w-6 h-6 mr-2 text-yellow-400 transform transition-transform ${
                isOpen ? "rotate-90" : ""
              }`}
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

        <FaTrash
          className="text-red-500 hover:text-red-700 cursor-pointer transition duration-300"
          onClick={() => onClickDelete(item.ItemProps.Id, isFolder)}
        />
      </div>
      {isHovered && isFolder && (
        <div className="ml-6 mb-1 p-1 bg-green-700/30 text-white text-xs">
          Drop here to move to <strong>{item.ItemProps.Title}</strong>
        </div>
      )}
      {isOpen && item.items && (
        <div className="ml-2.5">
          {item.items.map((i) => (
            <TreeNode
              key={i.ItemProps.Id}
              item={i}
              isFolder={!(i.ItemProps as ReactTemplateDisplayDTO).Script}
              onClickDelete={onClickDelete}
              onMoveItem={onMoveItem}
              isAddingFolder={isAddingFolder}
              setIsAddingFolder={setIsAddingFolder}
            />
          ))}
          <NewFolderAction
            directories={directories}
            isAddingFolder={isAddingFolder}
            setIsAddingFolder={setIsAddingFolder}
            projectId={projectId as string}
            setDirectories={setDirectories}
            directoryId={item.ItemProps.Id}
          />
        </div>
      )}
    </div>
  );
};

export default TreeNode;
