import { get, post } from "@/common/utils/react-query";
import { ILoginInput, IRole } from "../interfaces";
import { apiSimabu } from "@/common/configs/api";
import { IOfficer } from "@/user/interfaces";
import { USER_LOGIN } from "../constants";

export const useGetRoles = get<IRole[]>(
  () => apiSimabu.get("/roles"),
  ["roles"]
);

export const useLogin = post<{ token: string }, ILoginInput>(
  ({ formValues }) => apiSimabu.post("/auth/login", formValues),
  []
);

export const useGetProfile = get<IOfficer>(
  () => apiSimabu.get("/user/my"),
  [USER_LOGIN]
);
