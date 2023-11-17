import axios from "axios";

export const apiSimabu = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
