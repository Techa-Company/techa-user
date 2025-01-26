import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setActiveIndex } from "../../stores/activeIndexSlice";
import { createTab, decrement } from "../../stores/tabsSlice";
import { setComponents } from "../../stores/componentsSlice";

const WidgetSearch = ({ isVisible, setVisible }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const components = useSelector((state) => state.components);

  const [searchQuery, setSearchQuery] = useState("");
  const tabs = useSelector((state) => state.tabs);

  useEffect(() => {
    if (isVisible) {
      ref.current.focus();
    }
    return () => {};
  }, [isVisible]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!components.components || components.components.length < 1) {
          const response = await axios.get("/ReactTest/Components/full");
          dispatch(setComponents(response.data));
        }
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };

    fetchData();
  }, []);
  const handleBlur = (e) => {
    setVisible(false);
  };
  // Filter components based on search query
  const filteredComponents = components.components
    ? components.components.filter((component) =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const onClick_ComponentItem = (component) => {
    const sameTab = tabs.find((tab) => tab.name == component.name);

    if (sameTab) {
      dispatch(setActiveIndex(sameTab.index));
    } else {
      dispatch(createTab({ component }));
      dispatch(setActiveIndex(component.Id));
    }
  };

  return (
    <div
      onBlur={handleBlur}
      className={`bg-[#1f1f1f] absolute w-[40%] left-1/4 z-[5666] mx-auto flex flex-col justify-center items-center rounded-md border shadow-sm top-2 ${
        !isVisible && "hidden"
      }`}
    >
      <div className="text-center text-sm mx-auto mt-2 font-mono">
        <span className="flex">
          Search Components
          <BiSolidSearch />
        </span>
      </div>
      <div className="w-full py-2 px-2">
        <input
          ref={ref}
          className="w-full outline-dashed outline-amber-600 p-1 text-sm mx-auto"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col mb-3 px-2">
        {filteredComponents &&
          filteredComponents.map((component, index) => (
            <div
              key={index}
              className="w-full rounded-sm hover:bg-white/10 flex select-none text-sm text-start  px-1"
              onMouseDown={() => onClick_ComponentItem(component)}
            >
              {component.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default WidgetSearch;
