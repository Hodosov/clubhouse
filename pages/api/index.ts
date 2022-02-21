import axios from "axios";
import Cookies from "nookies";
import { GetServerSidePropsContext } from "next";
import { UserApi } from "./userApi";

export const Api = (ctx: GetServerSidePropsContext) => {
  const cookies = Cookies.get(ctx);
  const token = cookies.token;

  const instance = axios.create({
    baseURL: "http://localhost:5051/",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return {
    ...UserApi(instance),
  };
};
