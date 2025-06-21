// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import languageReducer from "./languageSlice";
import bucketReducer from "./bucketSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    language: languageReducer,
    bucket: bucketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
