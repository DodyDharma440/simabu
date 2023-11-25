import { makeHandler } from "@/common/utils/api-route";
import {
  createErrResponse,
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { IBookCategoryInput } from "@/books/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const searchFields = ["nama"];
    const searchParams = parseParams(req, "search", {
      search: { fields: searchFields },
    });
    const count = await prisma.kategori.count(searchParams);

    const results = await prisma.kategori.findMany({
      ...parseParams(req, "pagination"),
      ...searchParams,
    });

    createResponse(res, paginationResponse(results, count));
  },
  POST: async (req, res) => {
    const body = req.body as IBookCategoryInput;

    const nameExist = await prisma.kategori.findFirst({
      where: { nama: body.nama },
    });

    if (nameExist) {
      createErrResponse(res, "Kategori sudah ada", 400);
      return;
    }

    const category = await prisma.kategori.create({
      data: body,
    });

    return createResponse(res, category, 201);
  },
}));
