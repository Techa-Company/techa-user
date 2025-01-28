import { ReactTemplateDisplayDTO } from "@/app/assets/api/types/dtos/InlineReactDtos";
import React, { useState } from "react";

interface RenameModalProps {
  onClose: () => void;
  component?: ReactTemplateDisplayDTO;
  onRename: (newName: string) => void;
}

const RenameModal: React.FC<RenameModalProps> = ({
  onClose,
  onRename,
  component,
}) => {
  const [newName, setNewName] = useState(component?.Title ?? "");

  const handleRename = () => {
    if (newName.trim()) {
      onRename(newName);
      onClose();
    }
  };

  return (
    <div className="absolute top-0 left-0 inset-0 z-50 flex items-center justify-center text-center">
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50"
        onClick={onClose}
      />
      <div className="absolute w-11/12 max-w-md bg-gray-800 rounded-md p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Rename File</h2>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter new file name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleRename}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
