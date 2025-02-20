import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const dataUploadSlice = createSlice({
  name: "dataUploadSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      return state.filter((user) => user.ID !== action.payload);
    },
  },
});

export const { add, remove, setData } = dataUploadSlice.actions;
export default dataUploadSlice.reducer;
