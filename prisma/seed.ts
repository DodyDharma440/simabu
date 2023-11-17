import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const roleNames = ["Admin", "Petugas", "Mahasiswa"];
  const roles = await prisma.role.createMany({
    data: roleNames.map((name) => ({ name })),
  });

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

  console.log({ roles, admin, petugasAdmin });
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
