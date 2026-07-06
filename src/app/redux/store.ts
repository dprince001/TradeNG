"use client"
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/app/redux/api/appSlice";
import { generalApiSlice } from "@/app/redux/api/apiSlice";

import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [generalApiSlice.reducerPath]: generalApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generalApiSlice.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
