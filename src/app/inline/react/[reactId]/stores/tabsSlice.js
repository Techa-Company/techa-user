import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = [
        ...state,
        { name: "test tab", code: "nothing", comment: "thefuck" },
      ];
    },
    createTab: (state, action) => {
      const { component } = action.payload;
      const sameTab = state.find((tab) => tab.name == component.name);
      if (!sameTab)
        return [
          ...state,
          { name: component.name, code: component.code, index: component.id },
        ];
    },
    decrement: (state, action) => {
      const { name } = action.payload;
      return state.filter((tab) => tab.name != name);
    },
    setCurrentCode: (state, action) => {
      const { code, activeIndex } = action.payload;
      const foundIndex = state.findIndex((item) => item.index == activeIndex);
      console.log(code);

      if (foundIndex !== -1) {
        state[foundIndex].code = code;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  getFirst,
  createTab,
  setCurrentCode,
} = tabsSlice.actions;

export default tabsSlice.reducer;

export const selectFirstItem = (state) => state.tabsSlice[0]; // Selector to get the first item
