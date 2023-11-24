import bcrypt from "bcrypt";
import {
  createErrResponse,
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { z } from "zod";
import { makeHandler } from "@/common/utils/api-route";
import { IOfficerInput } from "@/user/interfaces";
import { petugasZodSchema } from "@/user/constants";

const SALT = 10;

const zodCreateSchema = z.object({
  ...petugasZodSchema,
  password: z
    .string({
      required_error: "Password harus diisi",
    })
    .min(6),
});

const handler = makeHandler((prisma) => ({
  GET: async (req, res) => {
    const searchFields = [
      "nama",
      "nip",
      "alamat",
      "noTelp",
      "user.username",
      "user.role.name",
    ];
    const searchParam = parseParams(req, "search", {
      search: { fields: searchFields },
    });

    const count = await prisma.petugas.count(searchParam);

    const results = await prisma.petugas.findMany({
      ...parseParams(req, "pagination"),
      ...searchParam,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            roleId: true,
            role: true,
          },
        },
      },
    });

    createResponse(res, paginationResponse(results, count));
  },
  POST: async (req, res) => {
    const body = req.body as IOfficerInput;
    const validations = zodCreateSchema.safeParse(body);

    if (!validations.success) {
      const { errors } = validations.error;
      createErrResponse(res, { message: "Invalid request", errors }, 400);

      return;
    }

    const { username, password, roleId, ...petugasBody } = body;
    const usernameExist = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameExist) {
      createErrResponse(res, "Username already exists", 400);
      return;
    }

    const hashedPassword = await bcrypt.hash(password || "", SALT);
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
}));

export default handler;
