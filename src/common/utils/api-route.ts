import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { createErrResponse } from "./api-response";
import multer from "multer";
import { makeFileName } from "./data";

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
  Record<
    HttpMethod,
    (req: NextApiRequest, res: NextApiResponse) => Promise<void>
  >
>;

export const makeHandler = (
  methodsHandler: (prisma: PrismaClient) => NextApiHandler
) => {
  const handlers = methodsHandler(prisma);
  const availableMethods = Object.keys(handlers);

  const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method) {
      if (availableMethods.includes(req.method)) {
        try {
          await handlers[req.method as HttpMethod]?.(req, res);
        } catch (error: any) {
          // eslint-disable-next-line
          console.log("Error API routes handler", error);
          createErrResponse(
            res,
            { ...error, message: error?.message.split("\n") },
            500
          );
        }
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

export const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let imageName = "";

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/uploads");
      },
      filename: (req, file, cb) => {
        imageName = makeFileName(file, res);
        cb(null, imageName);
      },
    });

    const upload = multer({ storage });
    await runMiddleware(req, res, upload.any());

    if (req.files?.length) {
      if (req.files.length > 1) {
        return res.status(400).json({
          message: "Only 1 file allowed",
        });
      }

      req.imageUrl = `${process.env["NEXT_PUBLIC_API_BASE_URL"]}/api/image/${imageName}`;
    }

    return req;
  } catch (error: any) {
    // eslint-disable-next-line
    console.log("Error upload file", error);
    createErrResponse(res, error?.message);
  }
};

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: any
) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
