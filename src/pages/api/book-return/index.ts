import {
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const searchFields = [
      "peminjaman.mahasiswa.nama",
      "peminjaman.mahasiswa.nim",
    ];
    const searchParams = parseParams(req, "search", {
      search: { fields: searchFields },
    });

    const count = await prisma.pengembalian.count(searchParams);

    const results = await prisma.pengembalian.findMany({
      ...parseParams(req, "pagination"),
      ...searchParams,
      include: {
        peminjaman: {
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
        },
      },
    });

    const bookReturns = results.map((book) => ({
      ...book,
      isApproved: Boolean(book.petugasId),
    }));

    createResponse(res, paginationResponse(bookReturns, count));
  },
}));
