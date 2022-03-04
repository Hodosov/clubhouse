import axios from "axios";
import Cookies from "nookies";
import { GetServerSidePropsContext } from "next";
import { UserApi } from "./userApi";
import { RoomApi } from "./roomApi";

type ApiReturnType = ReturnType<typeof UserApi> & ReturnType<typeof RoomApi>;

export const Api = (ctx: any): ApiReturnType => {
  const cookies = Cookies.get(ctx);
  const token = cookies.token;

  const instance = axios.create({
    baseURL: "http://192.168.0.143:5051/",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return {
    ...UserApi(instance),
    ...RoomApi(instance),
  };
};
