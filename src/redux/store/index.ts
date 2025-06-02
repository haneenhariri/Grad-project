// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice";
import commentsReducer from "../commentsSlice/commentsSlice";
import languageReducer from '../languageSlice/languageSlice';
import coursesReducer from '../coursesSlice/coursesSlice';
import profileReducer from '../profileSlice/profileSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    language: languageReducer,
    courses: coursesReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
