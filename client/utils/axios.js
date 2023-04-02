import axios from "axios";

export default axios.create({
  baseURL: "http://10.42.0.236:3000",
  withCredentials: true,
});
