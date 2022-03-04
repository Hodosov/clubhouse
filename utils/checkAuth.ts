import { GetServerSidePropsContext } from "next";
import { Api } from "../pages/api";
import { UserData } from "../pages";
import { RootState } from "redux/store";
import { Store } from "@reduxjs/toolkit";

export const checkAuth = async (
  ctx: any & {
    store: Store<RootState>;
  }
): Promise<UserData | null> => {
  try {
    return await Api(ctx).getMe();
  } catch (error) {
    return null;
  }
};
