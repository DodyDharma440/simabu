import { periodDates } from "@/borrow-return/constants";
import { BorrowPeriod, IBorrowApprovalInput } from "@/borrow-return/interfaces";
import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const id = Number(req.query["id"]);
    const body = req.body as IBorrowApprovalInput;

    const userData = decodeToken(req);

    const borrow = await prisma.peminjaman.findUnique({
      where: { id },
      include: { DetailPeminjaman: true },
    });

    if (!borrow) {
      createErrResponse(res, { message: "Data not found" }, 404);
      return;
    }

    if (borrow.status !== "Pengajuan") {
      createErrResponse(res, { message: "Status harus Pengajuan" }, 404);
      return;
    }

    const borrowDate = body.status === "Diterima" ? new Date() : null;
    const returnDate =
      body.status === "Diterima"
        ? periodDates[borrow.periode as BorrowPeriod]
        : null;

    const updatedBorrow = await prisma.peminjaman.update({
      where: { id },
      data: {
        status: body.status,
        updatedAt: new Date(),
        petugasId: userData?.id,
        tanggalPeminjaman: borrowDate,
        tanggalKembali: returnDate,
      },
    });

    if (body.status === "Diterima") {
      const books = await prisma.buku.findMany({
        where: {
          id: { in: borrow.DetailPeminjaman.map((d) => d.bukuId) },
        },
      });
      await prisma.$transaction(
        books.map((book) => {
          return prisma.buku.update({
            where: {
              id: book.id,
            },
            data: {
              stok: book.stok - 1,
              updatedAt: new Date(),
            },
          });
        })
      );
    }

    return createResponse(res, updatedBorrow);
  },
}));
