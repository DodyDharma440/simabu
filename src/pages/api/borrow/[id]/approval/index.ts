import { IBorrowApprovalInput } from "@/borrow-return/interfaces";
import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const id = Number(req.query["id"]);
    const body = req.body as IBorrowApprovalInput;

    const borrow = await prisma.peminjaman.findUnique({ where: { id } });

    if (!borrow) {
      createErrResponse(res, { message: "Data not found" }, 404);
      return;
    }

    if (borrow.status !== "Pengajuan") {
      createErrResponse(res, { message: "Status harus Pengajuan" }, 404);
      return;
    }

    const updatedBorrow = await prisma.peminjaman.update({
      where: { id },
      data: {
        status: body.status,
        updatedAt: new Date(),
      },
    });

    return createResponse(res, updatedBorrow);
  },
}));
