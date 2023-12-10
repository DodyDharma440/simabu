import { IBookReturnInput } from "@/borrow-return/interfaces";
import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  POST: async (req, res) => {
    const body = req.body as IBookReturnInput;

    const borrowData = await prisma.peminjaman.findUnique({
      where: { id: body.peminjamanId },
    });

    if (!borrowData) {
      createErrResponse(res, "Peminjaman not found", 404);
      return;
    }

    const bookReturn = await prisma.pengembalian.create({
      data: {
        peminjamanId: body.peminjamanId,
      },
    });

    createResponse(res, bookReturn, 201);
  },
}));
