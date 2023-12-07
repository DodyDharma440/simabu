/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const roleNames = ["Admin", "Petugas", "Mahasiswa"];
  const roles = await prisma.$transaction(
    roleNames.map((role, index) =>
      prisma.role.upsert({
        update: {},
        create: { name: role },
        where: { id: index + 1 },
      })
    )
  );

  const studyProgramNames = [
    "Informatika",
    "Sistem Informasi",
    "Sistem Informasi Akuntansi",
  ];
  const shortSp = ["IF", "SI", "SIA"];
  const studyPrograms = await prisma.$transaction(
    studyProgramNames.map((sp, index) =>
      prisma.programStudi.upsert({
        update: {},
        create: { nama: sp, namaSingkat: shortSp[index] },
        where: { id: index + 1 },
      })
    )
  );

  const password = "admin";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { username: "superadmin" },
    update: {},
    create: {
      username: "superadmin",
      roleId: 1,
      updatedAt: new Date(),
      password: hashedPassword,
    },
  });

  const petugasAdmin = await prisma.petugas.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      nama: "Super Admin",
      userId: 1,
      nip: "12345678",
    },
  });

  console.log({ roles, studyPrograms, admin, petugasAdmin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
