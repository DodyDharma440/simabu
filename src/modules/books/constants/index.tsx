import { z } from "zod";
import { ICategory } from "../interfaces";
import { TableActionArgs } from "@/common/interfaces/ui";
import { createTableColumns } from "@/common/utils/react-table";
import { ActionIcon, Group } from "@mantine/core";
import { HiPencilAlt, HiTrash } from "react-icons/hi";

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

export const categoriesCols = ({
  onEdit,
  onDelete,
}: TableActionArgs<ICategory>) => {
  return createTableColumns<ICategory>(({ accessor }) => [
    accessor("nama", {
      header: "Nama",
    }),
    {
      header: "Aksi",
      justifyHeader: "center",
      cell: ({ row }) => {
        return (
          <Group spacing="xs" noWrap position="center" w="100%">
            <ActionIcon
              onClick={() => onEdit(row.original)}
              color="primary"
              variant="filled"
            >
              <HiPencilAlt />
            </ActionIcon>
            <ActionIcon
              onClick={() => onDelete(row.original.id)}
              color="red"
              variant="filled"
            >
              <HiTrash />
            </ActionIcon>
          </Group>
        );
      },
    },
  ]);
};
