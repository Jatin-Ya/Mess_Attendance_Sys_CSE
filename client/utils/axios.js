import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.137.148:3000",
  withCredentials: true,
});
