import { NextApiRequest, NextApiResponse } from "next";
import { createErrResponse } from "@/common/utils/api-response";

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  createErrResponse(res, "Unauthorized", 401);
};

export default handler;
