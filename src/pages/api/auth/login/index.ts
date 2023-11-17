import dayjs from "dayjs";
import { SignJWT } from "jose";
import Cookies from "cookies";
import bcrypt from "bcrypt";
import { createSecretKey } from "crypto";
import { ILoginInput } from "@/auth/interfaces";
import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

const handler = makeHandler((prisma) => ({
  POST: async (req, res) => {
    const { body } = req;

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

    const { id } = user;

    const token = await new SignJWT({ id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(createSecretKey(process.env["JWT_SECRET"]!, "utf-8"));

    const cookies = new Cookies(req, res);
    cookies.set(process.env["COOKIE_NAME"]!, token, {
      httpOnly: true,
      expires: dayjs().add(1, "day").toDate(),
      path: "/",
    });

    createResponse(res, { token });
  },
}));

export default handler;
