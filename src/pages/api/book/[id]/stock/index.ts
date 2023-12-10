import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const id = Number(req.query["id"] as string);
    const body = req.body as { stok: number };

    const existedBook = await prisma.buku.findUnique({
      where: { id },
    });
    if (!existedBook) {
      createErrResponse(res, "Buku not found", 404);
      return;
    }

    const book = await prisma.buku.update({
      data: {
        stok: body.stok,
        updatedAt: new Date(),
      },
      where: { id },
    });

    createResponse(res, book);
  },
}));
