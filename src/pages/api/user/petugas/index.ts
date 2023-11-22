import bcrypt from "bcrypt";
import {
  createErrResponse,
  createResponse,
  paginationResponse,
  parsePaginationParams,
} from "@/common/utils/api-response";
import { z } from "zod";
import { makeHandler } from "@/common/utils/api-route";
import { IOfficerInput } from "@/user/interfaces";

const SALT = 10;

export const baseZodObj = {
  nama: z.string({
    required_error: "Nama harus diisi",
  }),
  nip: z
    .string({
      required_error: "NIP harus diisi",
    })
    .min(16)
    .max(16),
  alamat: z.string(),
  noTelp: z.string(),
  username: z.string({
    required_error: "Username harus diisi",
  }),
};

const zodCreateSchema = z.object({
  ...baseZodObj,
  password: z
    .string({
      required_error: "Password harus diisi",
    })
    .min(6),
});

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
}));

export default handler;
