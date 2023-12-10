import { checkIsBorrowing } from "@/borrow-return/utils";
import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const userData = decodeToken(req);
    const student = await prisma.mahasiswa.findUnique({
      where: { userId: userData?.id || 0 },
    });

    if (!student) {
      createErrResponse(res, "Student not found", 404);
      return;
    }

    const isBorrowing = await checkIsBorrowing(prisma, student.id);

    return createResponse(res, isBorrowing);
  },
}));
