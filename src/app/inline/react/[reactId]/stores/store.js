import { configureStore } from "@reduxjs/toolkit";
import tabsReducer from "./tabsSlice";
import componentsReducer from "./componentsSlice";
import { activeIndexReducer } from "./activeIndexSlice";

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    activeIndex: activeIndexReducer,
    components: componentsReducer,
  },
});
