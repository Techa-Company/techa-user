"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useModalStore from "../../stores/modalSlice";
import useTabsStore from "../../stores/tabSlice";
import { ReactTemplateDefaults } from "@/app/assets/utils/reactTemplateConsts";

const NewTabModal: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const { isNewTabModalVisible: isOpen, setModalVisibility } = useModalStore();
  const { createTab } = useTabsStore();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleToggleTemplates = () => {
    setShowTemplates(!showTemplates);
    if (!showTemplates) setSelectedTemplate(null);
  };
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 500); // Match the duration of the fade-out animation
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setModalVisibility("isNewTabModalVisible", false);
    }, 500);
  };

  const handleCreateTab = () => {
    createTab({
      code: ReactTemplateDefaults[selectedTemplate ?? 0].code,
      name: inputValue,
    });
    handleClose();
  };

  if (!isVisible && !isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-xl text-white mb-4">Create a New Tab</h2>
        <input
          name="newTab"
          placeholder="sample.jsx"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 mb-4 text-white bg-gray-800 rounded-md focus:outline-none"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleCreateTab();
            }
          }}
        />
        <button
          className="w-full px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          onClick={handleToggleTemplates}
        >
          {showTemplates ? "Hide Templates" : "Choose a Template"}
        </button>
        {showTemplates && (
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {ReactTemplateDefaults.map((template, index) => (
              <li key={template.id}>
                <button
                  onClick={() => setSelectedTemplate(index)}
                  className={`w-full p-2 rounded ${
                    selectedTemplate === index ? "bg-blue-600" : "bg-gray-800"
                  } text-white`}
                >
                  {template.name}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none"
            onClick={handleCreateTab}
          >
            Create Tab
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NewTabModal;
