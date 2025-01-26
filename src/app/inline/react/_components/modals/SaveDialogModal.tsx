"use client";
import React from "react";
import useModalStore from "../stores/modalSlice";
import useTabsStore from "../stores/tabSlice";
import {
  SaveReactTemplate,
  UpdateReactTempate,
} from "@/app/_assets/_api/_handlers/InlineReactHandler";
interface SaveDialogModalProps {}
const SaveDialogModal: React.FC<SaveDialogModalProps> = () => {
  const { currentTab, decrement } = useTabsStore();
  const { isSaveDialogModalVisible: isOpen, setModalVisibility } =
    useModalStore();
  const setSaveDialogModalVisible = (visibility: boolean) =>
    setModalVisibility("isSaveDialogModalVisible", visibility);
  const { name, id, code } = currentTab() ?? {};
  const onClose = () => setSaveDialogModalVisible(false);
  const onDiscard = () => {
    decrement(name);
    onClose();
  };
  const onSave = async () => {
    if (id) {
      const result = await UpdateReactTempate({
        Id: id,
        Script: code,
        Title: name,
      });
      if (result.data.IsSuccess) {
        decrement(name);
        setSaveDialogModalVisible(false);
      }
    } else {
      const result = await SaveReactTemplate({
        Script: code,
        Title: name,
        IsMain: false,
      });
      if (result.data.IsSuccess) {
        decrement(name);
        setSaveDialogModalVisible(false);
      }
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-white mb-4">Save Changes</h2>
        <p className="text-gray-300 mb-6">
          You have unsaved changes. Do you want to save them before closing?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onDiscard}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300"
          >
            Discard
          </button>
          <button
            onClick={onSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveDialogModal;
