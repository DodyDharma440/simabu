import { IUser } from "@/auth/interfaces";
import { jwtVerify, decodeJwt } from "jose";
import { NextApiRequest } from "next";

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env["JWT_SECRET"]!)
    );
    return Boolean(payload);
  } catch (error) {
    // eslint-disable-next-line
    console.log("Error verify token: ", error);
    return false;
  }
};

export const decodeToken = <T = Omit<IUser, "password">>(
  req: NextApiRequest
) => {
  const token = req.cookies[process.env["COOKIE_NAME"]!];
  if (token) {
    return decodeJwt(token) as T;
  }
  return null;
};
