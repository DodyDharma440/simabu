import {
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const categoryId = Number(req.query.categoryId || "0");
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

    const count = await prisma.buku.count({
      where: {
        ...(searchParams as any)["where"],
        stok: {
          gt: 0,
        },
      },
    });

    const books = await prisma.buku.findMany({
      include: {
        kategori: true,
      },
      ...parseParams(req, "pagination"),
      where: {
        ...(searchParams as any)["where"],
        stok: {
          gt: 0,
        },
        ...(categoryId
          ? {
              kategoriId: categoryId,
            }
          : {}),
      },
    });

    createResponse(res, paginationResponse(books, count));
  },
}));
