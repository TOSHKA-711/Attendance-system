import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("selectedCourse")) || null : null,
  sessionId: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("sessionId")) || "" : "",
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
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("sessionId", JSON.stringify(action.payload));
      }
    },
    hydrate: (state, action) => {
      state.course = action.payload.course;
      state.sessionId = action.payload.sessionId;
    },
  },
});

export const { setSelectedCourse, setSessionId, hydrate } = selectedCourseSlice.actions;
export default selectedCourseSlice.reducer;
