import { ReactTemplateDisplayDTO } from "@/app/assets/api/types/dtos/InlineReactDtos";
import React from "react";

interface TreeComponentItemProps {
  isCurrent: boolean;
  isMain: boolean;
  component: ReactTemplateDisplayDTO;
}

const TreeComponentItem: React.FC<TreeComponentItemProps> = ({
  isCurrent,
  isMain,
  component,
}) => {
  // Determine the background color based on the current and main flags
  const backgroundColor = isCurrent
    ? "bg-amber-800"
    : isMain
    ? "bg-fuchsia-800"
    : "bg-cyan-800";

  return (
    <div
      className={`flex flex-col p-2 text-white w-max m-3 rounded-md transition-all ease-in-out overflow-hidden mx-auto ring-amber-300 hover:ring ${backgroundColor}`}
      id={`comp-${component.Title}`}
    >
      <a href={`/ReactTest/components/${component.Title}`}>{component.Title}</a>
    </div>
  );
};

export default TreeComponentItem;
