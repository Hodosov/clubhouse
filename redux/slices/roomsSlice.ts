import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room, RoomApi, RoomType } from "pages/api/roomApi";
import { Axios } from "@core/axios";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "redux/store";

export type RoomsState = {
  items: Room[];
};

const initialState: RoomsState = {
  items: [],
};

export const fetchCreateRoom = createAsyncThunk<
  Room,
  { title: string; type: RoomType }
>("rooms/fetchCreateRoomStatus", async (form, thunkAPI) => {
  try {
    const room = await RoomApi(Axios).createRoom(form);
    return room;
  } catch (error) {
    console.log(error);
  }
});

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchCreateRoom.fulfilled.type,
        (state, action: PayloadAction<Room>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        state.items = action.payload.rooms.items;
      }),
});

export const { setRooms } = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;
