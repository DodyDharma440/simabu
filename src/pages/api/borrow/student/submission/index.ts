import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const userData = decodeToken(req);
    const student = await prisma.mahasiswa.findUnique({
      where: { userId: userData?.id },
    });

    if (!student) {
      createErrResponse(res, "Student not found", 404);
      return;
    }

    const submission = await prisma.peminjaman.findFirst({
      include: {
        petugas: true,
        DetailPeminjaman: {
          include: {
            buku: {
              include: {
                kategori: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        mahasiswaId: student.id,
        OR: [
          { status: "Diterima" },
          { status: "Ditolak" },
          { status: "Pengajuan" },
        ],
      },
    });

    return createResponse(res, submission);
  },
}));
