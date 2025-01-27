import React from "react";
import HeaderItem from "./HeaderItemNew";
import {
  BiBookOpen,
  BiCodeAlt,
  BiDockTop,
  BiImport,
  BiIntersect,
  BiSolidSave,
} from "react-icons/bi";
import { BsWindowDock } from "react-icons/bs";
import useModalStore from "../stores/modalSlice";
interface HeaderProps {
  isDocked: boolean;
  setIsDocked: (docked: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({ isDocked, setIsDocked }) => {
  const { setModalVisibility, isCdnLinkModalVisible } = useModalStore();

  return (
    <div className="flex space-x-4 ">
      <HeaderItem
        icon={<BiIntersect size={19} />}
        onClick={() => setModalVisibility("isSPModalVisible", true)}
        title={"API"}
      />
      <HeaderItem
        icon={<BiBookOpen size={19} />}
        onClick={() => setModalVisibility("isComponentsModalVisible", true)}
        title={"Components"}
      />
      <HeaderItem
        icon={<BiSolidSave size={19} />}
        onClick={() => setModalVisibility("isSaveModalVisible", true)}
        title={"Save"}
      />
      <HeaderItem
        icon={<BiSolidSave size={19} />}
        onClick={() => setModalVisibility("isSaveModalVisible", true)}
        title={"Save as"}
      />
      <HeaderItem
        icon={<BiImport size={19} />}
        onClick={() => setModalVisibility("isImportModalVisible", true)}
        title={"Import"}
      />
      <HeaderItem
        icon={isDocked ? <BsWindowDock size={19} /> : <BiDockTop size={19} />}
        onClick={() => setIsDocked(!isDocked)}
        title={isDocked ? "Dock" : "Undock"}
      />
      <HeaderItem
        icon={<BiCodeAlt size={19} />}
        onClick={() =>
          setModalVisibility("isCdnLinkModalVisible", !isCdnLinkModalVisible)
        }
        title={"Cdn Links"}
      />
    </div>
  );
};

export default Header;
