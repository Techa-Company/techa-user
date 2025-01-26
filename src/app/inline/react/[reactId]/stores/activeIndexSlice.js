// activeIndexSlice.js
import { createSlice } from "@reduxjs/toolkit";

const activeIndexSlice = createSlice({
  name: "activeIndex",
  initialState: -1,
  reducers: {
    setActiveIndex: (state, action) => action.payload,
  },
});

export const { setActiveIndex } = activeIndexSlice.actions;
export const activeIndexReducer = activeIndexSlice.reducer;
