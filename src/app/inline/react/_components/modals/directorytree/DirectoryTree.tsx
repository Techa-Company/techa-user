"use client";
import React, { useEffect, useState } from "react";
import useComponentStore from "../../stores/componentSlice";
import useDirectoryStore from "../../stores/directoriesSlice";
import buildHierarchy from "../../helpers/HierarchyHelper";
import MiniTreeNode from "./MiniTreeNode";

interface DirectoryTreeProps {
  onSelectDirectory: (directoryId: number) => void;
}

const DirectoryTree: React.FC<DirectoryTreeProps> = ({ onSelectDirectory }) => {
  const { components } = useComponentStore();
  const { directories } = useDirectoryStore();
  const [selectedDirectoryId, setSelectedDirectoryId] = useState<number | null>(
    null
  );
  const [hierarchy, setHierarchy] = useState(() =>
    buildHierarchy(directories, components)
  );

  // Recalculate hierarchy when directories or components change
  useEffect(() => {
    setHierarchy(buildHierarchy(directories, components));
  }, [directories, components]);

  const handleDirectoryClick = (id: number) => {
    setSelectedDirectoryId(id);
    onSelectDirectory(id);
  };

  return (
    <div className="h-full w-64 flex-col flex bg-gray-900 mx-auto mt-1.5 rounded-lg overflow-y-auto">
      {hierarchy.length === 0 ? (
        <div className="text-gray-500 p-4">
          No directories or components found.
        </div>
      ) : (
        hierarchy.map((directory) => (
          <MiniTreeNode
            key={directory.ItemProps.Id}
            item={directory}
            onClick={handleDirectoryClick}
            selectedDirectoryId={selectedDirectoryId ?? undefined}
          />
        ))
      )}
    </div>
  );
};

export default DirectoryTree;
