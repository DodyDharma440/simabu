import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import bcrypt from "bcrypt";
import { ILoginInput } from "@/modules/auth/interfaces";
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
  },
}));

export default handler;
