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
    Pick<IUser, "username" | "roleId"> {
  password?: string;
}

export interface IStudyProgram extends BasicData {
  nama: string;
  namaSingkat: string;
}

export interface IStudent extends BasicData {
  nama: string;
  nim: string;
  alamat: string | null;
  noTelp: string | null;
  userId: number;
  user?: IUser;
  programStudiId: number;
  programStudi?: IStudyProgram;
}

export interface IStudentInput
  extends Omit<IStudent, keyof BasicData | "userId" | "user" | "programStudi"> {
  password?: string;
}
