import axios from "axios";
import { parseCookies } from "nookies";

const Axios = axios.create({
  baseURL: "http://localhost:5051/",
  headers: {
    Authorization: "Bearer " + parseCookies()?.token,
  },
});

export { Axios };
