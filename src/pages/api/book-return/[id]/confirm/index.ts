import { IBookReturnConfirmInput } from "@/borrow-return/interfaces";
import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const id = Number(req.query["id"]);
    const userData = decodeToken(req);
    const body = req.body as IBookReturnConfirmInput;

    const bookReturn = await prisma.pengembalian.findUnique({ where: { id } });
    const borrow = await prisma.peminjaman.findUnique({
      where: { id: bookReturn?.peminjamanId || 0 },
      include: { DetailPeminjaman: true },
    });

    if (!bookReturn || !borrow) {
      createErrResponse(res, "Data not found", 404);
      return;
    }

    const result = await prisma.pengembalian.update({
      where: { id },
      data: {
        tanggalPengembalian: new Date(),
        denda: body.denda,
        updatedAt: new Date(),
        petugasId: userData?.id || null,
      },
    });

    await prisma.peminjaman.update({
      where: { id: borrow.id },
      data: {
        status: "Selesai",
      },
    });

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
            stok: book.stok + 1,
            updatedAt: new Date(),
          },
        });
      })
    );

    return createResponse(res, result);
  },
}));
