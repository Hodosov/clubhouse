import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import { roomsReducer } from "./slices/roomsSlice";

const rootReducer = combineReducers({
  rooms: roomsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (): Store<RootState> =>
  configureStore({
    reducer: rootReducer,
  });
