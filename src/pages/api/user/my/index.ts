import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

const handler = makeHandler((prisma) => ({
  GET: async (req, res) => {
    const userData = decodeToken(req);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userData?.id,
        },
        include: {
          role: true,
        },
      });

      if (!user) {
        createErrResponse(res, "user not found", 404);
        return;
      }

      const petugas = await prisma.petugas.findUnique({
        where: {
          userId: user?.id,
        },
      });

      const { password, ...restUser } = user;

      createResponse(res, { ...restUser, petugas });
    } catch (error) {
      createErrResponse(res, error);
    }
  },
}));

export default handler;
