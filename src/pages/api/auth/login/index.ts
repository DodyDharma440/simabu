import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import bcrypt from "bcrypt";
import createError from "http-errors";
import { ILoginInput } from "@/modules/auth/interfaces";
import { createErrResponse, createResponse } from "@/common/utils/api-response";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  switch (method) {
    case "POST":
      const isLogin = req.cookies[process.env["COOKIE_NAME"]!];
      if (isLogin) {
        createErrResponse(res, "You are already logged in", 400);
        return;
      }

      const { username, password } = body as ILoginInput;
      const user = await prisma.user.findUnique({ where: { username } });

      const checkPassword = bcrypt.compareSync(password, user?.password || "");
      if (!checkPassword || !user) {
        createErrResponse(res, "Username or password not match", 400);
        return;
      }

      const { password: pwd, ...restUser } = user;
      const token = jwt.sign(restUser, process.env["JWT_SECRET"]!, {
        expiresIn: "1d",
      });

      const cookies = new Cookies(req, res);
      cookies.set(process.env["COOKIE_NAME"]!, token, {
        httpOnly: true,
        expires: dayjs().add(1, "day").toDate(),
        path: "/",
      });
      createResponse(res, { token });
      break;

    default:
      createErrResponse(res, "Method not allowed", 405);
  }
};

export default handler;
