import React, { useEffect, RefObject } from "react";
import { TreeNodeProps } from "./TreeNode.types";

interface ItemActionsProps {
  contextMenu: { visible: boolean; x: number; y: number };
  item: TreeNodeProps["item"];
  isFolder: boolean;
  contextMenuRef: RefObject<HTMLDivElement>;
  handleClickMakeMain: () => void;
  handleClickOutside: (event: MouseEvent) => void;
}

const ItemActions: React.FC<ItemActionsProps> = ({
  contextMenu,
  item,
  isFolder,
  contextMenuRef,
  handleClickMakeMain,
  handleClickOutside,
}) => {
  // useEffect to handle adding and removing the event listener
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      {contextMenu.visible && (
        <div ref={contextMenuRef} className="absolute bg-[#460e46] text-white">
          {!isFolder && (
            <button className="block px-2 py-0.5" onClick={handleClickMakeMain}>
              Make {item.ItemProps.Title} component main
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ItemActions;
