import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import authSliceWarga from "../features/authSliceWarga";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authwarga: authSliceWarga,
  },
});
