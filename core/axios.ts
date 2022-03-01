import axios from "axios";
import { parseCookies } from "nookies";

const Axios = axios.create({
  baseURL: "http://192.168.0.143:5051",
  headers: {
    Authorization: "Bearer " + parseCookies()?.token,
  },
});

export { Axios };
