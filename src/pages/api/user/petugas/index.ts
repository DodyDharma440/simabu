import bcrypt from "bcrypt";
import {
  createResponse,
  paginationResponse,
  parsePaginationParams,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { IOfficerInput } from "@/user/interfaces";

const SALT = 10;

const handler = makeHandler((prisma) => ({
  GET: async (req, res) => {
    const count = await prisma.petugas.count();
    const results = await prisma.petugas.findMany({
      ...parsePaginationParams(req),
    });

    createResponse(res, paginationResponse(results, count));
  },
  POST: async (req, res) => {
    const body = req.body as IOfficerInput;
    const { username, password, roleId, ...petugasBody } = body;

    const hashedPassword = await bcrypt.hash(password, SALT);
    const petugas = await prisma.petugas.create({
      data: {
        ...petugasBody,
        user: {
          create: {
            username,
            password: hashedPassword,
            roleId: Number(roleId),
          },
        },
      },
    });

    createResponse(res, petugas, 201);
  },
  PATCH: async (req, res) => {},
}));

export default handler;
