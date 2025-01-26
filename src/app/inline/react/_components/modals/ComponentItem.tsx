import React, { useState } from "react";
import LoadingSpinner from "../widgets/LoadingSpinner";
import { ReactTemplateDisplayDTO } from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";
import axios from "@/app/_assets/_api/_handlers/axiosInstance";
import useComponentStore from "../stores/componentSlice";
interface ComponentItemProps {
  component: ReactTemplateDisplayDTO;
}
const ComponentItem: React.FC<ComponentItemProps> = ({ component }) => {
  const [isTopDropdownOpen, setTopDropdownOpen] = useState(false);
  const [isBottomDropdownOpen, setBottomDropdownOpen] = useState(false);
  const [isSPDropdownOpen, setSPDropdownOpen] = useState(false);
  const [storedProcedures, setStoredProcedures] = useState(null);
  const [isSpLoading, setSpLoading] = useState(false);
  const { Id, Title, Script, RelatedTemplates } = component;
  const { components } = useComponentStore();
  const parentComponents = components.filter(
    (c) => c.RelatedTemplates.find((x) => x.ChildId == Id) != null
  );

  const spDropdownHandler = () => {
    if (storedProcedures == null) {
      setSpLoading(true);
      axios
        .get(`/ReactTest/components/${component.Id}/storedprocedures`)
        .then((response) => {
          setStoredProcedures(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setSpLoading(false);
        });
    }

    setSPDropdownOpen(!isSPDropdownOpen);
  };

  return (
    <li className="flex relative h-min overflow-visible  bg-red-800 text-white min-w-[200px] my-3 rounded-xl transition-all ease-in-out mx-3">
      <div className="flex flex-col w-max justify-center items-center mx-auto px-3">
        <div className={` ${isTopDropdownOpen ? "block" : "hidden"}`}>
          {parentComponents?.map((pComponent) => (
            <a
              className="mt-4 hover:underline cursor-pointer"
              key={pComponent.Id}
              href={`/ReactTest/components/${pComponent.Title}`}
            >
              {pComponent.Title} {pComponent.Id}
            </a>
          ))}
        </div>
        <div
          className="mb-2 flex items-center opacity-70 cursor-pointer text-sm self-center px-5 py-2"
          onClick={() => setTopDropdownOpen(!isTopDropdownOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform  ${
              isTopDropdownOpen ? "rotate-0" : "rotate-180"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <p className="ml-2">Parent Components</p>
        </div>
        <div className="flex mx-auto justify-center w-full">
          <span
            onClick={() => {
              setBottomDropdownOpen(!isBottomDropdownOpen);
              setTopDropdownOpen(!isTopDropdownOpen);
            }}
            className="self-center"
          >
            <a
              className="hover:underline"
              href={`/ReactTest/components/${name}`}
            >
              [{Title} {Id}]
            </a>
          </span>
        </div>
        <div
          className="mt-2 flex items-center opacity-70 cursor-pointer text-sm self-center px-5 py-2"
          onClick={() => setBottomDropdownOpen(!isBottomDropdownOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform ${
              isBottomDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <p className="ml-2">Child Components</p>
        </div>

        <div
          className={` ${isBottomDropdownOpen ? "flex flex-col" : "hidden"}`}
        >
          {component.RelatedTemplates?.map((pComponent) => (
            <a
              className="mb-4 hover:underline cursor-pointer"
              key={pComponent.ChildTitle}
              href={`/ReactTest/components/${pComponent.ChildTitle}`}
            >
              {pComponent.ChildTitle} {pComponent.ChildId}
            </a>
          ))}
        </div>
      </div>
      <div
        className={`ml-auto border-l max-w-[65px] border-gray-100/20 flex items-center cursor-pointer text-sm px-2 relative`}
      >
        <div
          className="flex h-full justify-center items-center w-full"
          onClick={spDropdownHandler}
        >
          <p className="mr-auto">SP</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-all ${
              isSPDropdownOpen ? "rotate-90" : "-rotate-90"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <div
          className={
            "absolute z-10 -right-36 top-100% bg-red-800  border-gray-300 w-max shadow-md "
          }
          onClick={() => setBottomDropdownOpen(false)}
        ></div>
      </div>
    </li>
  );
};

export default ComponentItem;
