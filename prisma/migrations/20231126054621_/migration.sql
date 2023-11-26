-- CreateEnum
CREATE TYPE "StatusPeminjaman" AS ENUM ('Pengajuan', 'Diterima', 'Ditolak');

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramStudi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "namaSingkat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgramStudi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Petugas" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "alamat" TEXT,
    "noTelp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Petugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "alamat" TEXT,
    "noTelp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "programStudiId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buku" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "kodeBuku" TEXT NOT NULL,
    "imageUrl" TEXT,
    "penerbit" TEXT NOT NULL,
    "tahunTerbit" INTEGER NOT NULL,
    "jumlahHalaman" INTEGER NOT NULL,
    "penulis" TEXT,
    "nomorRak" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "kategoriId" INTEGER NOT NULL,

    CONSTRAINT "Buku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Peminjaman" (
    "id" SERIAL NOT NULL,
    "status" "StatusPeminjaman" NOT NULL DEFAULT 'Pengajuan',
    "mahasiswaId" INTEGER NOT NULL,
    "petugasId" INTEGER NOT NULL,
    "tanggalPeminjaman" TIMESTAMP(3) NOT NULL,
    "tanggalKembali" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Peminjaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailPeminjaman" (
    "id" SERIAL NOT NULL,
    "bukuId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peminjamanId" INTEGER NOT NULL,

    CONSTRAINT "DetailPeminjaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengembalian" (
    "id" SERIAL NOT NULL,
    "tanggalPengembalian" TIMESTAMP(3) NOT NULL,
    "petugasId" INTEGER NOT NULL,
    "denda" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peminjamanId" INTEGER NOT NULL,

    CONSTRAINT "Pengembalian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Petugas_nip_key" ON "Petugas"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "Petugas_userId_key" ON "Petugas"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nim_key" ON "Mahasiswa"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_userId_key" ON "Mahasiswa"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Buku_kodeBuku_key" ON "Buku"("kodeBuku");

-- CreateIndex
CREATE UNIQUE INDEX "Pengembalian_peminjamanId_key" ON "Pengembalian"("peminjamanId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Petugas" ADD CONSTRAINT "Petugas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_programStudiId_fkey" FOREIGN KEY ("programStudiId") REFERENCES "ProgramStudi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buku" ADD CONSTRAINT "Buku_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "Kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_petugasId_fkey" FOREIGN KEY ("petugasId") REFERENCES "Petugas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPeminjaman" ADD CONSTRAINT "DetailPeminjaman_bukuId_fkey" FOREIGN KEY ("bukuId") REFERENCES "Buku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPeminjaman" ADD CONSTRAINT "DetailPeminjaman_peminjamanId_fkey" FOREIGN KEY ("peminjamanId") REFERENCES "Peminjaman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengembalian" ADD CONSTRAINT "Pengembalian_petugasId_fkey" FOREIGN KEY ("petugasId") REFERENCES "Petugas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengembalian" ADD CONSTRAINT "Pengembalian_peminjamanId_fkey" FOREIGN KEY ("peminjamanId") REFERENCES "Peminjaman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
