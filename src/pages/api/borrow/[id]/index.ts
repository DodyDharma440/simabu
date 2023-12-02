import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const id = req.query["id"];

    const borrow = await prisma.peminjaman.findUnique({
      where: { id: Number(id) },
      include: {
        DetailPeminjaman: {
          include: {
            buku: {
              include: {
                kategori: true,
              },
            },
          },
        },
      },
    });

    if (!borrow) {
      createErrResponse(res, { message: "Data not found" }, 404);
      return;
    }

    createResponse(res, borrow);
  },
}));
