import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

const handler = makeHandler((prisma) => ({
  DELETE: async (req, res) => {
    const id = Number(req.query.id);
    const petugas = await prisma.petugas.findUnique({ where: { id } });

    if (!petugas) {
      createErrResponse(res, "Petugas not found", 404);
      return;
    }

    await prisma.$transaction([
      prisma.petugas.delete({ where: { id: petugas.id } }),
      prisma.user.delete({ where: { id: petugas.userId } }),
    ]);

    createResponse(res, "Success");
  },
}));

export default handler;
