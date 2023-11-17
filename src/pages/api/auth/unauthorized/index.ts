import { createErrResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

const handler = makeHandler(() => ({
  GET: (req, res) => {
    createErrResponse(res, "Unauthorized", 401);
  },
}));

export default handler;
