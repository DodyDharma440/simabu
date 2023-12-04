import { z } from "zod";
import {
  parseParams,
  createResponse,
  paginationResponse,
  createErrResponse,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { bookZodSchema } from "@/books/constants";
import { IBookInput } from "@/books/interfaces";
import { decodeToken } from "@/common/utils/auth";

const zodSchema = z.object(bookZodSchema);

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const searchFields = [
      "judul",
      "kodeBuku",
      "penerbit",
      "tahunTerbit",
      "jumlahHalaman",
      "penulis",
      "kategori.nama",
    ];
    const searchParams = parseParams(req, "search", {
      search: { fields: searchFields },
    });
    const count = await prisma.buku.count(searchParams);

    const results = await prisma.buku.findMany({
      ...parseParams(req, "pagination"),
      ...searchParams,
      include: {
        kategori: true,
      },
    });

    createResponse(res, paginationResponse(results, count));
  },
  POST: async (req, res) => {
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
    if (existCode) {
      createErrResponse(res, "Kode buku sudah ada", 400);
      return;
    }

    const token = decodeToken(req);
    const officer = await prisma.petugas.findUnique({
      where: { userId: token?.id },
    });

    body.imageUrl = req.imageUrl;

    const book = await prisma.buku.create({
      data: {
        ...body,
        createdBy: officer?.nama || null,
        updatedBy: officer?.nama || null,
      },
    });

    createResponse(res, book, 201);
  },
}));
