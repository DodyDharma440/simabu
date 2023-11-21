import axios from "axios";
import { NextRouter } from "next/router";

export const apiSimabu = axios.create({
  baseURL: `${process.env["NEXT_PUBLIC_API_BASE_URL"]}/api`,
  withCredentials: true,
});

export const handleLogout = (router?: NextRouter) => {
  if (router) {
    router.push("/logout");
  } else {
    if (typeof window !== "undefined") {
      window.location.href = `/logout`;
    }
  }
};

apiSimabu.interceptors.response.use(
  (res: any) => {
    if (res) {
      return res;
    }
  },
  (error) => {
    if (error.response && error.response?.status === 401) {
      window.location.href = `/logout`;
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);
