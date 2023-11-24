import bcrypt from "bcrypt";
import {
  createErrResponse,
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { z } from "zod";
import { makeHandler } from "@/common/utils/api-route";
import { IStudentInput } from "@/user/interfaces";
import { studentZodSchema } from "@/user/constants";

const SALT = 10;

const zodCreateSchema = z.object({
  ...studentZodSchema,
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
      "nim",
      "alamat",
      "noTelp",
      "user.username",
      "user.role.name",
      "programStudi.nama",
    ];
    const searchParam = parseParams(req, "search", {
      search: { fields: searchFields },
    });

    const count = await prisma.mahasiswa.count(searchParam);

    const results = await prisma.mahasiswa.findMany({
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
        programStudi: true,
      },
    });

    createResponse(res, paginationResponse(results, count));
  },
  POST: async (req, res) => {
    const body = req.body as IStudentInput;
    const validations = zodCreateSchema.safeParse(body);

    if (!validations.success) {
      const { errors } = validations.error;
      createErrResponse(res, { message: "Invalid request", errors }, 400);

      return;
    }

    const role = await prisma.role.findFirst({ where: { name: "Mahasiswa" } });
    if (!role) {
      createErrResponse(res, "Role tidak ditemukan", 400);
      return;
    }

    const { password, programStudiId, ...mahasiswaBody } = body;
    const usernameExist = await prisma.user.findUnique({
      where: { username: mahasiswaBody.nim },
    });

    if (usernameExist) {
      createErrResponse(res, "Username already exists", 400);
      return;
    }

    const hashedPassword = await bcrypt.hash(password || "", SALT);
    const mahasiswa = await prisma.mahasiswa.create({
      data: {
        ...mahasiswaBody,
        programStudi: {
          connect: { id: Number(programStudiId) },
        },
        user: {
          create: {
            username: mahasiswaBody.nim,
            password: hashedPassword,
            roleId: Number(role.id),
          },
        },
      },
    });

    createResponse(res, mahasiswa, 201);
  },
}));

export default handler;
