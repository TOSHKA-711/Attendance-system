import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: null,
};

const selectedCourseSlice = createSlice({
  name: "selectedCourse",
  initialState,
  reducers: {
    setSelectedCourse: (state, action) => {
      state.course = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedCourse", JSON.stringify(action.payload));
      }
    },
    hydrate: (state, action) => {
      state.course = action.payload;
    },
  },
});


export const { setSelectedCourse, hydrate } = selectedCourseSlice.actions;
export default selectedCourseSlice.reducer;
