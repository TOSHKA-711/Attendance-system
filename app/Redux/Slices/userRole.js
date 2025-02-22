
import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    return {
      isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
    };
  }
  return { isAdmin: false }; // Default state for SSR
};

const userRoleSlice = createSlice({
  name: "userRoleSlice",
  initialState: getInitialState(),
  reducers: {
    setAdminRole: (state) => {
      state.isAdmin = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("isAdmin", JSON.stringify(true));
      }
    },
    setStaffRole: (state) => {
      state.isAdmin = false;
      if (typeof window !== "undefined") {
        localStorage.setItem("isAdmin", JSON.stringify(false));
      }
    },
  },
});

export const { setAdminRole, setStaffRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
