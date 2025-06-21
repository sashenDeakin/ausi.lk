// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
