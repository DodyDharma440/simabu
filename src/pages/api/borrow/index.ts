import {
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const status = req.query["status"];
    const searchFields = ["mahasiswa.nama", "mahasiswa.nim"];
    const searchParams = parseParams(req, "search", {
      search: { fields: searchFields },
    });

    if (status) {
      (searchParams as any).where.status = status;
    }

    const count = await prisma.peminjaman.count(searchParams);

    const results = await prisma.peminjaman.findMany({
      ...parseParams(req, "pagination"),
      ...searchParams,
      include: {
        mahasiswa: {
          select: {
            id: true,
            nama: true,
            nim: true,
          },
        },
        DetailPeminjaman: {
          include: {
            buku: {
              select: {
                id: true,
                judul: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    createResponse(res, paginationResponse(results, count));
  },
}));
