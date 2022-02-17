import Axios from "axios";
import { parseCookies } from "nookies";

const instance = Axios.create({
  baseURL: "http://localhost:5051/",
  headers: {
    Authorization: "Bearer " + parseCookies()?.token,
  },
});

export default instance;
