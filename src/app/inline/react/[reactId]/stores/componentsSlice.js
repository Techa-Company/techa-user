import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    setComponents: (state, action) => action.payload,
  },
});
export const { setComponents } = componentsSlice.actions;

export default componentsSlice.reducer;
