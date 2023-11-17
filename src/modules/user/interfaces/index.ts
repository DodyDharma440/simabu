import { IUser } from "@/auth/interfaces";
import { BasicData } from "@/common/interfaces/api";

export interface IOfficer extends BasicData {
  nama: string;
  nip: string;
  alamat: string | null;
  noTelp: string | null;
  userId: number;
  user?: IUser;
}

export interface IOfficerInput
  extends Omit<IOfficer, keyof BasicData | "userId" | "user">,
    Pick<IUser, "username" | "password" | "roleId"> {}
