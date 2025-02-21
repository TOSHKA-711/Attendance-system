import { createSlice } from "@reduxjs/toolkit";

// Get the initial state from localStorage or default to false
const initialState = {
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
};

const userRoleSlice = createSlice({
  name: "userRoleSlice",
  initialState,
  reducers: {
    setAdminRole: (state) => {
      state.isAdmin = true;
      localStorage.setItem("isAdmin", JSON.stringify(true));
    },
    setStaffRole: (state) => {
      state.isAdmin = false;
      localStorage.setItem("isAdmin", JSON.stringify(false));
    },
  },
});

export const { setAdminRole, setStaffRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
