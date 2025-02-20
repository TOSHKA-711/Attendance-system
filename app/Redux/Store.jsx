import { configureStore } from "@reduxjs/toolkit";
import dataUploadReducer from "./Slices/dataUploadReducer"; 

const Store = configureStore({
  reducer: {
    dataUpload: dataUploadReducer,
  },
});

export default Store;
