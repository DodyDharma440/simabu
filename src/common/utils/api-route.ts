import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { createErrResponse } from "./api-response";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

type NextApiHandler = Partial<
  Record<HttpMethod, (req: NextApiRequest, res: NextApiResponse) => void>
>;

export const makeHandler = (
  methodsHandler: (prisma: PrismaClient) => NextApiHandler
) => {
  const handlers = methodsHandler(prisma);
  const availableMethods = Object.keys(handlers);

  const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method) {
      if (availableMethods.includes(req.method)) {
        return handlers[req.method as HttpMethod]?.(req, res);
      } else {
        return createErrResponse(res, "Method not allowed", 405);
      }
    } else {
      createErrResponse(res, "Internal server error", 500);
      return;
    }
  };

  return handler;
};
