import { periodDates } from "@/borrow-return/constants";
import { IBorrowInput } from "@/borrow-return/interfaces";
import { checkIsBorrowing } from "@/borrow-return/utils";
import {
  createErrResponse,
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const userData = decodeToken(req);

    const status = req.query["status"];
    const searchFields = ["tanggalPeminjaman", "tanggalKembali"];
    const searchParams = parseParams(req, "search", {
      search: { fields: searchFields },
    });

    if (status) {
      (searchParams as any).where.status = status;
    }

    (searchParams as any).where.mahasiswaId = userData?.id;

    const count = await prisma.peminjaman.count(searchParams);

    const results = await prisma.peminjaman.findMany({
      ...parseParams(req, "pagination"),
      ...searchParams,
      include: {
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
  POST: async (req, res) => {
    const body = req.body as IBorrowInput;
    const userData = decodeToken(req);
    const student = await prisma.mahasiswa.findUnique({
      where: { userId: userData?.id || 0 },
    });

    if (!student) {
      createErrResponse(res, "Student not found", 404);
      return;
    }

    const isBorrowing = await checkIsBorrowing(prisma, student.id);

    if (isBorrowing) {
      createErrResponse(res, "Saat ini masih ada pengajuan", 400);
      return;
    }

    const books = await prisma.buku.findMany({
      where: {
        id: { in: body.bookIds },
      },
    });

    const borrow = await prisma.peminjaman.create({
      data: {
        mahasiswaId: student.id,
        status: "Pengajuan",
        periode: body.borrowPeriod,
      },
    });

    const details = books.map((book) => ({
      bukuId: book.id,
      peminjamanId: borrow.id,
    }));
    const borrowDetails = await prisma.detailPeminjaman.createMany({
      data: details,
    });

    createResponse(res, { ...borrow, details: borrowDetails }, 201);
  },
}));
