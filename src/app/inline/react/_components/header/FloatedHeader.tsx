import React, { ReactNode, useEffect, useRef } from "react";
import {
  BiBookOpen,
  BiDockTop,
  BiImport,
  BiIntersect,
  BiSolidSave,
} from "react-icons/bi";
import { BsWindowDock } from "react-icons/bs";
import useModalStore from "../stores/modalSlice";

interface FloatedHeaderItemProps {
  icon: ReactNode;
  onClick: () => void;
  title: string;
}

const FloatedHeaderItem: React.FC<FloatedHeaderItemProps> = ({
  icon,
  onClick,
  title,
}) => (
  <div
    className="flex items-center justify-center  p-3 my-2 cursor-pointer rounded-lg hover:bg-blue-500 transition-colors"
    onClick={onClick}
  >
    {icon}
    <span className="ml-2 text-sm font-medium">{title}</span>
  </div>
);

const FloatedHeader: React.FC<{ setVisible: (visible: boolean) => void }> = ({
  setVisible,
}) => {
  const { setModalVisibility } = useModalStore();
  const dragDisabled = false;
  const headerRef = useRef<HTMLDivElement>(null);
  const handleClick = (modalName: any) => {
    setModalVisibility(modalName, true);
    setVisible(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setVisible]);

  return (
    <div
      ref={headerRef}
      className="fixed top-0 left-0 h-full z-50 w-48 bg-gray-800 text-white shadow-lg flex flex-col items-center py-6 space-y-4"
    >
      <FloatedHeaderItem
        icon={<BiIntersect size={19} />}
        title={"API"}
        onClick={() => handleClick("isSPModalVisible")}
      />
      <FloatedHeaderItem
        icon={<BiBookOpen size={19} />}
        title={"Components"}
        onClick={() => handleClick("isComponentsModalVisible")}
      />
      <FloatedHeaderItem
        icon={<BiSolidSave size={19} />}
        title={"Save"}
        onClick={() => handleClick("isSaveModalVisible")}
      />
      <FloatedHeaderItem
        icon={<BiSolidSave size={19} />}
        title={"Save as"}
        onClick={() => handleClick("isSaveModalVisible")}
      />
      <FloatedHeaderItem
        icon={<BiImport size={19} />}
        title={"Import"}
        onClick={() => handleClick("isImportModalVisible")}
      />
      <FloatedHeaderItem
        icon={
          dragDisabled ? <BsWindowDock size={19} /> : <BiDockTop size={19} />
        }
        title={dragDisabled ? "Dock" : "Undock"}
        onClick={() => setVisible(false)}
      />
    </div>
  );
};

export default FloatedHeader;
