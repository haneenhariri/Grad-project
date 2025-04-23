// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice";
import commentsReducer from "../commentsSlice/commentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
