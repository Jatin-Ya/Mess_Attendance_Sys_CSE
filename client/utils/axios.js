import axios from "axios";

export default axios.create({
  baseURL: "http://10.10.28.209:3000",
  // baseURL: "http://192.168.102.112:3000",
  withCredentials : true
});
