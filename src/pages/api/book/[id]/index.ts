import { z } from "zod";
import { bookZodSchema } from "@/books/constants";
import { IBookInput } from "@/books/interfaces";
import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

const zodSchema = z.object(bookZodSchema);

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const id = Number(req.query["id"] as string);

    const book = await prisma.buku.findUnique({
      where: { id },
      include: {
        kategori: true,
      },
    });

    if (!book) {
      createErrResponse(res, "Buku not found", 404);
      return;
    }

    createResponse(res, book);
  },
  PATCH: async (req, res) => {
    const id = Number(req.query["id"] as string);

    const existedBook = await prisma.buku.findUnique({
      where: { id },
    });
    if (!existedBook) {
      createErrResponse(res, "Buku not found", 404);
      return;
    }

    const body = req.body as IBookInput;
    body.tahunTerbit = Number(body.tahunTerbit);
    body.nomorRak = Number(body.nomorRak);
    body.jumlahHalaman = Number(body.jumlahHalaman);
    body.stok = Number(body.stok);
    body.kategoriId = Number(body.kategoriId);

    const validations = zodSchema.safeParse(body);

    if (!validations.success) {
      const { errors } = validations.error;
      createErrResponse(res, { message: "Invalid request", errors }, 422);
      return;
    }

    const existCode = await prisma.buku.findUnique({
      where: { kodeBuku: body.kodeBuku },
    });
    if (existCode && existCode.id !== id) {
      createErrResponse(res, "Kode buku sudah ada", 400);
      return;
    }

    const token = decodeToken(req);
    const officer = await prisma.petugas.findUnique({
      where: { userId: token?.id },
    });

    if (req.imageUrl) {
      body.imageUrl = req.imageUrl;
    }
    const book = await prisma.buku.update({
      data: {
        ...body,
        updatedAt: new Date().toISOString(),
        updatedBy: officer?.nama || null,
      },
      where: { id },
    });

    createResponse(res, book);
  },
  DELETE: async (req, res) => {
    const id = Number(req.query["id"] as string);

    const book = await prisma.buku.findUnique({
      where: { id },
    });

    if (!book) {
      createErrResponse(res, "Buku not found", 404);
      return;
    }

    await prisma.buku.delete({
      where: { id },
    });

    createResponse(res, true);
  },
}));

export const config = {
  api: {
    bodyParser: false,
  },
};
