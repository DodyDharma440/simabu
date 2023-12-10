import { PrismaClient } from "@prisma/client";

export const checkIsBorrowing = async (
  prisma: PrismaClient,
  studentId: number
) => {
  const borroweds = await prisma.peminjaman.findMany({
    where: {
      OR: [{ status: "Diterima" }, { status: "Pengajuan" }],
      mahasiswaId: studentId,
    },
  });

  const count = await prisma.pengembalian.count({
    where: {
      AND: borroweds.map((b) => ({ peminjamanId: b.id })),
      petugasId: {
        not: null,
      },
    },
  });

  return borroweds.length && count === 0;
};
