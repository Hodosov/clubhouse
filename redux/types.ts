import { RoomsState } from "./slices/roomsSlice";
import { UserState } from "./slices/userSlice";

export type RootState = {
  user: UserState;
  rooms: RoomsState;
};
