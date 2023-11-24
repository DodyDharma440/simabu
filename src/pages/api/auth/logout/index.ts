import Cookies from "cookies";
import dayjs from "dayjs";
import { makeHandler } from "@/common/utils/api-route";
import { createResponse } from "@/common/utils/api-response";

export default makeHandler(() => ({
  GET: async (req, res) => {
    const cookies = new Cookies(req, res);

    cookies.set(process.env["COOKIE_NAME"]!, "", {
      httpOnly: true,
      expires: dayjs().add(-1, "day").toDate(),
      path: "/",
    });

    return createResponse(res, true);
  },
}));
