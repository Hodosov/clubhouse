import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { UserData } from "pages";
import { RootState } from "redux/types";

export type UserState = {
  data: UserData | null;
};

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(
      HYDRATE as any,
      (state, action: PayloadAction<RootState>) => {
        state.data = action.payload.user.data;
      }
    ),
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
