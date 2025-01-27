"use client";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { LiveError } from "react-live";
import useComponentStore from "../stores/componentSlice";
import { DeleteReactTemplate } from "@/app/_assets/_api/_handlers/InlineReactHandler";
import LoadingSpinner from "../widgets/LoadingSpinner";

interface ComponentItemProps {
  id: number;
  title: string;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ id, title }) => {
  const { removeComponent } = useComponentStore();

  const [isLoading, setIsLoading] = useState(false);
  const onClickDeleteHandler = (componentId: number) => {
    setIsLoading(true);
    DeleteReactTemplate({ id: componentId })
      .then((res) => {
        removeComponent(componentId); // Assuming this function removes a component by its ID
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="w-full my-2 flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300">
      {isLoading && <LoadingSpinner />}
      <div className="text-white text-lg w-4/5 text-clip">{title}</div>
      <FaTrash
        className="text-red-500 hover:text-red-700 cursor-pointer transition duration-300 w-1/5"
        onClick={() => onClickDeleteHandler(id)}
      />
    </div>
  );
};

const renderContent = (activeTab: number) => {
  const { components } = useComponentStore();

  switch (activeTab) {
    case 0:
      return (
        <div className="*:text-wrap">
          <LiveError />
        </div>
      );
    case 1:
      return <div>Console Content</div>;
    case 2:
      return (
        <div className="w-full flex flex-col">
          <h2 className="text-2xl text-white mb-4">My Components Content</h2>
          {components.map((c) => (
            <ComponentItem id={c.Id} title={c.Title} />
          ))}
        </div>
      );
    case 3:
      return <div>Exercises Content</div>;
    default:
      return null;
  }
};

export default renderContent;
