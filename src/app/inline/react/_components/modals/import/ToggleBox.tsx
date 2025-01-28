"use client";
import { ImportReactTemplate } from "@/app/assets/api/handlers/InlineReactHandler";
import { ReactTemplate } from "@/app/assets/api/types/ITemplateTypes";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";
import useComponentStore from "../../stores/componentSlice";
import { ReactTemplateDisplayDTO } from "@/app/assets/api/types/dtos/InlineReactDtos";
import usePageDataStore from "../../stores/pageDataSlice";
import useTabsStore from "../../stores/tabSlice";
interface ToggleBoxProps {
  index: number;
  component: ReactTemplate;
  isTutorial: boolean;
}
const ToggleBox: React.FC<ToggleBoxProps> = ({
  index,
  component,
  isTutorial,
}) => {
  const reactId = parseInt(useParams().reactId as string);
  // const { toggleIsImported } = useComponentStore.getState();
  const { pageData } = usePageDataStore();
  const { currentTab } = useTabsStore();
  const { components, setComponents } = useComponentStore();
  const CurrentTab = currentTab();
  const isImported =
    components
      .find((x) => x.Id == CurrentTab.id)
      ?.RelatedTemplates.find((r) => r.ChildId == component.Id) != null;
  const onClickHandler = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    try {
      const result = await ImportReactTemplate({
        Id: CurrentTab.id as number,
        OperationType: isImported ? 1 : 0,
        RelatedTemplateIds: [component.Id],
      });

      console.log(result);

      if (result.data.IsSuccess) {
        const newComponent = result.data.Data;
        const newComponents = components.map((c) =>
          c.Id == newComponent.Id ? newComponent : c
        );
        setComponents(newComponents);
      }
    } catch (error) {
      console.error("Error importing react template:", error);
    }
  };
  return (
    <div
      key={index}
      className="flex w-full justify-between items-center mb-2 cursor-pointer"
      onClick={onClickHandler}
    >
      <a
        className="hover:text-amber-700"
        href={`/ReactTest/components/${component.Id}`}
      >
        {component.Title ?? component.Id}
      </a>
      <label
        className={`inline-flex items-center cursor-pointer ${
          isImported ? "text-red-500" : "text-green-500"
        }`}
      >
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 ml-10 mr-1 text-green-500 cursor-pointer"
          checked={isImported}
          onChange={(e) => {
            e.preventDefault();
          }}
        />
        {isImported ? "Remove" : "Add"}
      </label>
    </div>
  );
};

export default ToggleBox;
