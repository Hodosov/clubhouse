import { roomsReducer } from "./slices/roomsSlice";
import { userReducer } from "./slices/userSlice";

export type RootState = {
  user: ReturnType<typeof userReducer>;
  rooms: ReturnType<typeof roomsReducer>;
};
