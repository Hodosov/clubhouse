import { RootState } from "redux/store";

export const selectRooms = (state: RootState) => state.rooms.items;
