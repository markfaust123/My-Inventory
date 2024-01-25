import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import itemsReducer from "./items";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    itemsState: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
