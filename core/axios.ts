import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:5051/",
});

export default instance;
