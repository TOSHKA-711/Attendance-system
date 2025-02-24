import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  token: "",
};

const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    hydrateUserRole: (state) => {
      if (typeof window !== "undefined") {
        state.isAdmin = localStorage.getItem("isAdmin") === "true"; // Store as string
        state.token = localStorage.getItem("token") || "";
      }
    },
    setAdminRole: (state) => {
      state.isAdmin = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("isAdmin", "true");
      }
    },
    setStaffRole: (state) => {
      state.isAdmin = false;
      if (typeof window !== "undefined") {
        localStorage.setItem("isAdmin", "false");
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
  },
});

export const { setAdminRole, setStaffRole, setToken, hydrateUserRole } =
  userRoleSlice.actions;
export default userRoleSlice.reducer;
