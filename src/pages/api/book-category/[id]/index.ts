import { IBookCategoryInput } from "@/books/interfaces";
import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const id = req.query["id"] as string;
    const body = req.body as IBookCategoryInput;

    const existedCategory = await prisma.kategori.findUnique({
      where: { id: Number(id) },
    });

    if (!existedCategory) {
      createErrResponse(res, "Kategori not found", 404);
      return;
    }

    const nameExist = await prisma.kategori.findFirst({
      where: { nama: body.nama },
    });

    if (nameExist) {
      createErrResponse(res, "Kategori sudah ada", 400);
      return;
    }

    const category = await prisma.kategori.update({
      data: body,
      where: { id: Number(id) },
    });

    return createResponse(res, category);
  },
  DELETE: async (req, res) => {
    const id = req.query["id"] as string;

    const category = await prisma.kategori.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      createErrResponse(res, "Kategori not found", 404);
      return;
    }

    await prisma.kategori.delete({
      where: { id: Number(id) },
    });

    createResponse(res, true);
  },
}));
