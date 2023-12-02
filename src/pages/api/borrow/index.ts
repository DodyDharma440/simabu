import { periodDates } from "@/borrow-return/constants";
import { IBorrowInput } from "@/borrow-return/interfaces";
import {
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const status = req.query["status"];
    const searchFields = [
      "mahasiswa.nama",
      "mahasiswa.nim",
      "tanggalPeminjaman",
      "tanggalKembali",
    ];
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
