import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./storeSlice"

export const store = configureStore({
  reducer:{
    author: authSlice,
  }
})