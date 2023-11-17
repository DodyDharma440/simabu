import axios from "axios";

export const apiSimabu = axios.create({
  baseURL: `${process.env["NEXT_PUBLIC_API_BASE_URL"]}/api`,
  withCredentials: true,
});
