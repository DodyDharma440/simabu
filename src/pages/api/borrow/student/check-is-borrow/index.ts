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

    const borroweds = await prisma.peminjaman.findMany({
      where: {
        OR: [
          { status: "Diterima" },
          { status: "Ditolak" },
          { status: "Pengajuan" },
        ],
        mahasiswaId: student.id,
      },
    });

    const count = await prisma.pengembalian.count({
      where: { AND: borroweds.map((b) => ({ peminjamanId: b.id })) },
    });

    return createResponse(res, count === 0);
  },
}));
