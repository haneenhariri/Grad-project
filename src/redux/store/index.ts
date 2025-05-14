// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice";
import commentsReducer from "../commentsSlice/commentsSlice";
import languageReducer from '../languageSlice/languageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
