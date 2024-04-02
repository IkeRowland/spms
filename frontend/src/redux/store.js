import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import courseReducer from "./slices/courseSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer
  },
});
