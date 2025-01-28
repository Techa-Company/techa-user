import React, { useState } from "react";
import { SaveProjectDirectoryApiHandler } from "@/app/assets/api/handlers/InlineReactHandler";

interface NewFolderActionProps {
  directoryId?: number;
  projectId: string;
  directories: any[];
  setDirectories: (dirs: any[]) => void;
  isAddingFolder: IsAddingProps;
  setIsAddingFolder: (isAdding: IsAddingProps) => void;
}

interface IsAddingProps {
  directory_id?: number;
  isAdding: boolean;
}

const NewFolderAction: React.FC<NewFolderActionProps> = ({
  directoryId,
  projectId,
  directories,
  setDirectories,
  isAddingFolder,
  setIsAddingFolder,
}) => {
  const [newFolderName, setNewFolderName] = useState<string>("");

  const onCreateFolderHandler = (
    folderName: string,
    parentDirectoryId?: number
  ) => {
    console.log(`Create new folder with name: ${folderName}`);
    if (projectId) {
      SaveProjectDirectoryApiHandler({
        ProjectId: parseInt(projectId),
        ParentDirectoryId: parentDirectoryId,
        Title: folderName,
      }).then((response) => {
        if (response.IsSuccess) {
          const newDirectories = [...directories, response.Data];
          setDirectories(newDirectories);
        }
      });
    }
    setIsAddingFolder({ isAdding: false, directory_id: undefined });
    setNewFolderName("");
  };

  const handleNewFolderKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && newFolderName.trim() !== "") {
      onCreateFolderHandler(newFolderName, directoryId);
    }
  };

  const handleNewFolderBlur = () => {
    if (newFolderName.trim() !== "") {
      onCreateFolderHandler(newFolderName, directoryId);
    } else {
      setIsAddingFolder({ isAdding: false, directory_id: undefined });
    }
  };

  return (
    <div className="text-sm pl-4 hover:bg-white/20 transition-all py-0.5 mx-4 rounded-lg">
      {isAddingFolder.isAdding &&
      isAddingFolder.directory_id === directoryId ? (
        <input
          type="text"
          className="w-full px-2 py-1 text-white bg-gray-800 border border-gray-700 focus:outline-none"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          onKeyPress={handleNewFolderKeyPress}
          onBlur={handleNewFolderBlur}
          autoFocus
        />
      ) : (
        <button
          className="text-white text-left"
          onClick={() =>
            setIsAddingFolder({ isAdding: true, directory_id: directoryId })
          }
        >
          + New Folder
        </button>
      )}
    </div>
  );
};

export default NewFolderAction;
