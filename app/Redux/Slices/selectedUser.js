import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("selectedUser")) || null : null,
//   sessionId: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("sessionId")) || "" : "",
};

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      }
    },
    // setSessionId: (state, action) => {
    //   state.sessionId = action.payload;
    //   if (typeof window !== "undefined") {
    //     localStorage.setItem("sessionId", JSON.stringify(action.payload));
    //   }
    // },
    // hydrate: (state, action) => {
    //   state.course = action.payload.course;
    //   state.sessionId = action.payload.sessionId;
    // },
  },
});

export const { setSelectedUser} = selectedUserSlice.actions;
export default selectedUserSlice.reducer;
