import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../widgets/LoadingSpinner";
import ToggleBox from "./ToggleBox";
import { useAuth } from "@/app/assets/components/contexts/AuthContext";
import useComponentStore from "../../stores/componentSlice";
import useModalStore from "../../stores/modalSlice";
import useTabsStore from "../../stores/tabSlice";

interface ImportsModalProps {
  CdnLinks: string[];
  Id?: number;
}

const ImportsModal: React.FC<ImportsModalProps> = ({ CdnLinks, Id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cdnInput, setCdnInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isAdmin } = useAuth();
  const { components } = useComponentStore();
  const { setModalVisibility } = useModalStore();
  const isTutorial = Id != null;
  const [cdnLinks, setCdnLinks] = useState(CdnLinks ?? []);
  const onSeachQueryChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleCdnLink = async (link: string) => {
    const response = await axios.post("/Reacttest/tutorials/importcdn", {
      id: Id,
      link: link,
    });
    console.log(response);
    if (response.data.isImported) {
      setCdnLinks([...cdnLinks, response.data.link]);
    } else {
      setCdnLinks(cdnLinks.filter((cdnlink) => cdnlink != link));
    }
  };

  //============// USE EFFEX //============\/

  return (
    <div
      className={`fixed w-screen h-screen z-50 flex items-center justify-center text-center `}
    >
      <div
        className="fixed w-screen h-screen bg-gray-800/50"
        onClick={() => setModalVisibility("isImportModalVisible", false)}
      />
      <div className="bg-[#1f1f1f] border border-black rounded-lg p-4 flex flex-col max-h-[400px] z-[51] w-[40%]">
        <h2 className="text-lg font-semibold mb-4">
          Components {isTutorial && "Tutorial"}
        </h2>
        {isAdmin && isTutorial && (
          <div className="w-full flex flex-col my-2 p-2 rounded-lg bg-fuchsia-950/20">
            <div className="w-full flex justify-around ">
              <input
                type="text"
                placeholder="Add Cdn Link"
                className="p-1 px-1.5 rounded-md py-0.5 w-4/5"
                value={cdnInput}
                onChange={(e) => setCdnInput(e.target.value)}
              />
              <button
                className="p-1 rounded-lg bg-green-900/80"
                onClick={() => handleToggleCdnLink(cdnInput)}
              >
                Add
              </button>
            </div>

            {cdnLinks.map((link, index) => (
              <div className="flex justify-between my-1">
                <div>{link}</div>
                <button
                  className="p-1 rounded-lg bg-red-900/80"
                  onClick={() => handleToggleCdnLink(link)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col overflow-y-scroll">
          {isAdmin && isTutorial && (
            <div className="w-full flex justify-center ">
              <input
                type="text"
                placeholder="Search Components"
                className="px-1 rounded-md py-0.5 w-4/5"
                value={searchQuery}
                onChange={onSeachQueryChangeHandler}
              />
            </div>
          )}
          {!isLoading ? (
            components
              .filter((c) => c.Id != Id)
              .map((component, index) => (
                <ToggleBox
                  index={index}
                  key={"toggle" + index}
                  component={component}
                  isTutorial={isTutorial}
                />
              ))
          ) : (
            <h1>
              Is Loading <LoadingSpinner />
            </h1>
          )}
        </div>
        <div className="flex justify-around mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setModalVisibility("isImportModalVisible", false)}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => location.reload()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportsModal;
