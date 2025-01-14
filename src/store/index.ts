import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import moviesReducer from "./moviesSlice";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
