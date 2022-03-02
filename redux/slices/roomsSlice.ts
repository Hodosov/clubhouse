import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  unwrapResult,
} from "@reduxjs/toolkit";
import { Room, RoomApi, RoomType } from "pages/api/roomApi";
import { Axios } from "@core/axios";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export type RoomsState = {
  items: Room[];
};

const initialState: RoomsState = {
  items: [],
};

export const useAsyncAction = <Arg, Returned>(
  actionCreator: AsyncThunk<Returned, Arg, {}>
) => {
  const dispatch = useDispatch<any>();

  return useCallback(
    (arg: Arg) =>
      dispatch(actionCreator(arg))
        .then((result) => unwrapResult(result))
        .catch((err) => Promise.reject(err)),
    [dispatch, actionCreator]
  );
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
  reducers: {},
  extraReducers: {
    [fetchCreateRoom.fulfilled.type]: (state, action: PayloadAction<Room>) => {
      state.items.push(action.payload);
    },
    [fetchCreateRoom.rejected.type]: () => {
      return null;
    },
  },
});

export const roomsReducer = roomsSlice.reducer;
