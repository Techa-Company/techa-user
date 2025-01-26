import { useRef, useState } from "react";
import { UpdateReactTempate } from "@/app/_assets/_api/_handlers/InlineReactHandler";
import { TreeNodeProps } from "./TreeNode.types";
import { ReactTemplateDisplayDTO } from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";
import useComponentStore from "../../stores/componentSlice";

export interface ContextMenuProps {
  item: TreeNodeProps["item"];
  isFolder: boolean;
  setComponents: (components: any) => void;
}

const ContextMenu = ({ item, isFolder, setComponents }: ContextMenuProps) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const { components } = useComponentStore();
  const onContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY - 80 });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(event.target as Node)
    ) {
      setContextMenu({ visible: false, x: 0, y: 0 });
    }
  };

  const handleClickMakeMain = async () => {
    if (!isFolder) {
      const result = await UpdateReactTempate({
        Id: item.ItemProps.Id,
        IsMain: !(item.ItemProps as ReactTemplateDisplayDTO).IsMain,
      });
      if (result.data.IsSuccess) {
        setComponents(
          components.map((comp) =>
            comp.Id === result.data.Data.Id
              ? result.data.Data
              : { ...comp, IsMain: false }
          )
        );
      }
    }
  };

  return [
    contextMenu,
    setContextMenu,
    contextMenuRef,
    onContextMenu,
    handleClickOutside,
    handleClickMakeMain,
  ];
};

export default ContextMenu;
