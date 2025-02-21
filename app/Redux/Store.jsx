import { configureStore } from "@reduxjs/toolkit";
import dataUploadReducer from "./Slices/dataUploadReducer"; 
import userRoleSlice from "./Slices/userRole"

const Store = configureStore({
  reducer: {
    dataUpload: dataUploadReducer,
    userRole : userRoleSlice
  },
});

export default Store;
