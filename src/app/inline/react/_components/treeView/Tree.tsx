import React, { useEffect, useState } from "react";
import useComponentStore from "../stores/componentSlice";
import TreeNode from "./treenode/TreeNode";
import {
  DeleteDirectoryApiHandler,
  DeleteReactTemplateApiHandler,
  UpdateDirectoryApiHandler,
  UpdateReactTempate,
} from "@/app/_assets/_api/_handlers/InlineReactHandler";
import { useQueryState } from "nuqs";
import { useDrop } from "react-dnd";
import useDirectoryStore from "../stores/directoriesSlice";
import buildHierarchy from "../helpers/HierarchyHelper";
import NewFolderAction from "./NewFolderAction";

interface IsAddingProps {
  directory_id?: number;
  isAdding: boolean;
}
const Tree: React.FC = () => {
  const { directories, setDirectories } = useDirectoryStore();
  const { components, setComponents } = useComponentStore();
  const [isAddingFolder, setIsAddingFolder] = useState<IsAddingProps>({
    isAdding: false,
  });
  const [newFolderName, setNewFolderName] = useState("");
  const [projectId, setProjectId] = useQueryState("project");

  // Build the hierarchical structure
  const [hierarchy, setHierarchy] = useState(
    buildHierarchy(directories, components)
  );
  useEffect(() => {
    setHierarchy(buildHierarchy(directories, components));
  }, [directories, components]);
  const onClickDeleteHandler = (id: number, isFolder: boolean) => {
    // Handle delete action
    console.log(`Delete item with id: ${id}`);
    if (isFolder) {
      DeleteDirectoryApiHandler(id).then((res) => {
        if (res.data.IsSuccess)
          setDirectories(directories.filter((x) => x.Id != id));
      });
    } else {
      DeleteReactTemplateApiHandler(id).then((res) => {
        if (res.data.IsSuccess)
          setComponents(components.filter((x) => x.Id != id));
      });
    }
  };

  const onChangeDirectoryHandler = async (
    sourceId: number,
    isItFolder: boolean,
    destinationId: number
  ) => {
    console.log(sourceId, isItFolder, destinationId);
    if (isItFolder) {
      UpdateDirectoryApiHandler({
        Id: sourceId,
        ParentDirectoryId: destinationId,
      }).then((res) => {
        if (res.data.IsSuccess) {
          const newDirectories = directories.map((d) =>
            d.Id == sourceId ? res.data.Data : d
          );
          setDirectories(newDirectories);
          console.log("success directory");
        }
      });
    } else {
      UpdateReactTempate({
        Id: sourceId,
        DirectoryId: destinationId,
      }).then((res) => {
        if (res.data.IsSuccess) {
          const newComponents = components.map((d) =>
            d.Id == sourceId ? res.data.Data : d
          );
          setComponents(newComponents);
          console.log("success React Template");
        }
      });
    }
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: "TREE_NODE",
    drop: (draggedItem: { id: number; isItFolder: boolean }) => {
      onChangeDirectoryHandler(draggedItem.id, draggedItem.isItFolder, -1);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    canDrop: () => true,
  });
  return (
    <div className="h-full w-64 flex-col flex bg-gray-900">
      {hierarchy.map((item) => (
        <TreeNode
          onMoveItem={onChangeDirectoryHandler}
          key={item.ItemProps.Title} // Use a unique key if possible
          item={item}
          isFolder={true}
          isLeaf={false}
          isAddingFolder={isAddingFolder}
          setIsAddingFolder={setIsAddingFolder}
          onClickDelete={onClickDeleteHandler}
        />
      ))}
      <NewFolderAction
        directories={directories}
        isAddingFolder={isAddingFolder}
        setIsAddingFolder={setIsAddingFolder}
        projectId={projectId as string}
        setDirectories={setDirectories}
      />
      <div
        className="w-full h-full"
        ref={(node) => {
          dropRef(node);
        }}
      />
    </div>
  );
};

export default Tree;
