import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/navSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
