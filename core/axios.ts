import Axios from "axios";
import Cookies from "js-cookie";

const instance = Axios.create({
  baseURL: "http://localhost:5051/",
  headers: {
    Authorization: "Bearer " + Cookies.get("token"),
  },
});

export default instance;
