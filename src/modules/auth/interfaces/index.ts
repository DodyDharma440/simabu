import { BasicData } from "@/common/interfaces/api";

export interface IRole extends BasicData {
  name: string;
}

export interface IUser extends BasicData {
  username: string;
  password: string;
  roleId: number;
  role?: IRole;
}

export interface ILoginInput extends Pick<IUser, "username" | "password"> {}
