import { useDrag, useDrop } from "react-dnd";
import { TreeNodeProps } from "./TreeNode.types";
import { ReactTemplateDisplayDTO } from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";

type DragAndDropHooksType = (
  item: TreeNodeProps["item"],
  isFolder: boolean,
  onMoveItem: (
    sourceId: number,
    isItFolder: boolean,
    destinationId: number
  ) => void,
  setIsHovered: (hover: boolean) => void
) => [{ isDragging: boolean }, (node: any) => void, (node: any) => void];

const DragAndDropHooks: DragAndDropHooksType = (
  item,
  isFolder,
  onMoveItem,
  setIsHovered
) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TREE_NODE",
    item: {
      id: item.ItemProps.Id,
      isItFolder: !(item.ItemProps as ReactTemplateDisplayDTO).Script,
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: () => setIsHovered(false),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: "TREE_NODE",
    drop: (draggedItem: { id: number; isItFolder: boolean }) => {
      if (draggedItem.id !== item.ItemProps.Id && isFolder) {
        onMoveItem(draggedItem.id, draggedItem.isItFolder, item.ItemProps.Id);
      }
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
    canDrop: () => isFolder,
  });

  return [{ isDragging }, dragRef, dropRef];
};

export default DragAndDropHooks;
