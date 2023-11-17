import { NextApiResponse } from "next";
import { ApiResponse } from "../interfaces/api";

export const createResponse = <T extends Object>(
  res: NextApiResponse,
  data: T,
  status: number = 200
) => {
  res.status(status).json({
    ok: true,
    statusCode: status,
    message: "Success",
    data,
  });
};

export const createErrResponse = (
  res: NextApiResponse,
  error: any,
  status: number = 500
) => {
  return res.status(status).json({
    ok: false,
    statusCode: status,
    message: "Error",
    error,
  });
};
