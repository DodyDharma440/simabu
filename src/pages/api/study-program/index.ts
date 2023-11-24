import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

const handler = makeHandler((prisma) => ({
  GET: async (req, res) => {
    const studyPrograms = await prisma.programStudi.findMany();
    return createResponse(res, studyPrograms);
  },
}));

export default handler;
