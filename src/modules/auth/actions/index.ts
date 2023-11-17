import { post } from "@/common/utils/react-query";
import { ILoginInput } from "../interfaces";
import { apiSimabu } from "@/common/configs/api";

export const useLogin = post<{ token: string }, ILoginInput>(
  ({ formValues }) => apiSimabu.post("/auth/login", formValues),
  []
);
