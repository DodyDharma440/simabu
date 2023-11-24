import { createErrResponse } from "@/common/utils/api-response";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  createErrResponse(res, "Forbidden Resource", 403);
};

export default handler;
