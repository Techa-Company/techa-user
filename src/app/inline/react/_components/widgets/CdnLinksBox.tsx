// src/components/CdnLinksBox.tsx
"use client";
import React, { useState } from "react";
import { FiTrash } from "react-icons/fi"; // Importing trash icon from react-icons
import useModalStore from "../stores/modalSlice";
import {
  DeleteCdnLinkApiHandler,
  SaveCdnLinkApiHandler,
} from "@/app/assets/api/handlers/InlineReactHandler";
import usePageDataStore from "../stores/pageDataSlice";
import { useQueryState } from "nuqs";

const CdnLinksBox: React.FC = () => {
  const {
    isCdnLinkModalVisible: visibility,
    setModalVisibility: setVisibility,
  } = useModalStore();

  const { cdnLinks, setCdnLinks } = usePageDataStore();
  const [projectId, setProjectId] = useQueryState("project");

  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleAddLink = async () => {
    if (!url || !description) {
      alert("Both URL and description are required.");
      return;
    }

    try {
      if (!projectId) return;
      const newLink = await SaveCdnLinkApiHandler({
        Url: url,
        Description: description,
        ProjectId: parseInt(projectId), // Replace this with your dynamic project ID.
      });
      if (newLink.IsSuccess) {
        alert("Success!");
        setCdnLinks([...cdnLinks, newLink.Data]);
        setUrl("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  const handleDeleteLink = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await DeleteCdnLinkApiHandler(id);
        setCdnLinks(cdnLinks.filter((link) => link.Id !== id));
      } catch (error) {
        console.error("Error deleting link:", error);
      }
    }
  };

  return (
    <div
      className={`w-full ${
        visibility ? "md:right-8" : "max-md:right-full md:-right-80"
      } transition-all fixed z-[48] md:max-w-80 rounded-md border border-purple-700 py-4 px-4 bg-primary text-text`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">CDN Links</h2>
        <button
          onClick={() => setVisibility("isCdnLinkModalVisible", false)}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
        >
          Close
        </button>
      </div>

      {/* List CDN Links */}
      <ul className="space-y-3 mb-4">
        {cdnLinks.map((link) => (
          <li
            key={link.Id}
            className="flex rounded truncate border-accent border  justify-between items-center p-2 border-b"
          >
            <div className=" text-wrap w-full  ">
              <div className=" flex justify-between">
                <p className="font-medium">{link.Description}</p>
                <button
                  onClick={() => handleDeleteLink(link.Id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash size={18} />
                </button>
              </div>
              <div className="max-w-[98%] truncate">
                <a
                  href={link.Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-300 max-w-[90%] truncate"
                >
                  {link.Url}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Add CDN Link Form */}
      <div className="mb-4 text-black">
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-2 px-2 py-1 border rounded"
        />
        <input
          type="text"
          placeholder="Enter CDN URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full mb-2 px-2 py-1 border rounded"
        />
        <button
          onClick={handleAddLink}
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add CDN Link
        </button>
      </div>
    </div>
  );
};

export default CdnLinksBox;
