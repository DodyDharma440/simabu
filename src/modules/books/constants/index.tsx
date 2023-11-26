import { z } from "zod";

export const BOOK_CATEGORIES = "book-categories";

export const bookZodSchema = {
  judul: z.string({
    required_error: "Judul harus diisi",
  }),
  kodeBuku: z.string({
    required_error: "Kode buku harus diisi",
  }),
  imageUrl: z.string().optional(),
  penerbit: z.string({
    required_error: "Penerbit harus diisi",
  }),
  tahunTerbit: z
    .number({
      required_error: "Tahun terbit harus diisi",
    })
    .min(1000, "Tahun terbit harus 4 karakter")
    .max(9999, "Tahun terbit harus 4 karakter"),
  jumlahHalaman: z.number({ required_error: "Jumlah halaman harus diisi" }),
  penulis: z.string().optional(),
  nomorRak: z.number({ required_error: "Nomor Rak harus diisi" }),
  stok: z.number({ required_error: "Stok harus diisi" }),
  kategoriId: z.number({ required_error: "Kategori harus diisi" }),
};
