import { z } from "zod";
import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { IStudentInput } from "@/user/interfaces";
import { studentZodSchema } from "@/user/constants";
import { decodeToken } from "@/common/utils/auth";

const zodUpdateSchema = z.object(studentZodSchema);

const handler = makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const body = req.body as Omit<IStudentInput, "password">;
    const id = req.query["id"] as string;

    const user = await prisma.mahasiswa.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      createErrResponse(res, { message: "User not found" }, 404);
      return;
    }

    const validations = zodUpdateSchema.safeParse(body);

    if (!validations.success) {
      const { errors } = validations.error;
      createErrResponse(res, { message: "Invalid request", errors }, 422);
      return;
    }
    const usernameExist = await prisma.user.findUnique({
      where: { username: body.nim },
      include: { Mahasiswa: true },
    });

    if (usernameExist && usernameExist.Mahasiswa?.id !== Number(id)) {
      createErrResponse(res, "Username already exists", 400);
      return;
    }

    const { programStudiId, ...mhsBody } = body;
    const mahasiswa = await prisma.mahasiswa.update({
      data: {
        ...mhsBody,
        updatedAt: new Date().toISOString(),
        programStudi: {
          connect: { id: Number(programStudiId) },
        },
        user: {
          update: {
            username: body.nim,
          },
        },
      },
      where: { id: Number(id) },
    });

    createResponse(res, mahasiswa);
  },
  DELETE: async (req, res) => {
    const userData = decodeToken(req);

    const id = Number(req.query.id);

    const mahasiswa = await prisma.mahasiswa.findUnique({ where: { id } });

    if (!mahasiswa) {
      createErrResponse(res, "User not found", 404);
      return;
    }

    if (userData?.id === mahasiswa.userId) {
      createErrResponse(res, "Tidak dapat menghapus diri sendiri.", 400);
      return;
    }

    await prisma.$transaction([
      prisma.mahasiswa.delete({ where: { id: mahasiswa.id } }),
      prisma.user.delete({ where: { id: mahasiswa.userId } }),
    ]);

    createResponse(res, "Success");
  },
}));

export default handler;
