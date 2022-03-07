import { GetServerSidePropsContext } from "next";
import { Api } from "../pages/api";
import { UserData } from "../pages";
import { RootState } from "redux/types";
import { Store } from "@reduxjs/toolkit";
import { setUser } from "redux/slices/userSlice";

export const checkAuth = async (
  ctx: any & {
    store: Store<RootState>;
  }
): Promise<UserData | null> => {
  try {
    const user = await Api(ctx).getMe();
    ctx.store.dispatch(setUser(user));
    return user;
  } catch (error) {
    return null;
  }
};
