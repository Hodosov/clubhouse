import { UserData } from "pages";
import { RootState } from "redux/types";

export const selectRooms = (state: RootState) => state.rooms.items;

export const selectUser = (state: RootState): UserData | null =>
  state.user.data;
