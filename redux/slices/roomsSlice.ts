import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "pages/api/roomApi";

export type RoomsState = {
  items: Room[];
};

const initialState: RoomsState = {
  items: [],
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addRoom: (state, action: PayloadAction<Room>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addRoom } = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;
