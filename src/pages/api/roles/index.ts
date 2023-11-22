import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

const handler = makeHandler((prisma) => ({
  GET: async (req, res) => {
    const roles = await prisma.role.findMany();
    return createResponse(res, roles);
  },
}));

export default handler;
