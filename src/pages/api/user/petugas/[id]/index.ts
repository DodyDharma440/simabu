import { z } from "zod";
import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { IOfficerInput } from "@/user/interfaces";
import { petugasZodSchema } from "@/user/constants";
import { decodeToken } from "@/common/utils/auth";

const zodUpdateSchema = z.object(petugasZodSchema);

const handler = makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const body = req.body as Omit<IOfficerInput, "password">;
    const id = req.query["id"] as string;

    const user = await prisma.petugas.findUnique({ where: { id: Number(id) } });

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

    const { username, roleId, ...petugasBody } = body;
    const usernameExist = await prisma.user.findUnique({
      where: { username },
      include: { Petugas: true },
    });

    if (usernameExist && usernameExist.Petugas?.id !== Number(id)) {
      createErrResponse(res, "Username already exists", 400);
      return;
    }

    const petugas = await prisma.petugas.update({
      data: {
        ...petugasBody,
        updatedAt: new Date().toISOString(),
        user: {
          update: {
            username,
            roleId: Number(roleId),
          },
        },
      },
      where: { id: Number(id) },
    });

    createResponse(res, petugas);
  },
  DELETE: async (req, res) => {
    const userData = decodeToken(req);

    const id = Number(req.query.id);

    const petugas = await prisma.petugas.findUnique({ where: { id } });

    if (!petugas) {
      createErrResponse(res, "User not found", 404);
      return;
    }

    if (userData?.id === petugas.userId) {
      createErrResponse(res, "Tidak dapat menghapus diri sendiri.", 400);
      return;
    }

    await prisma.$transaction([
      prisma.petugas.delete({ where: { id: petugas.id } }),
      prisma.user.delete({ where: { id: petugas.userId } }),
    ]);

    createResponse(res, "Success");
  },
}));

export default handler;
