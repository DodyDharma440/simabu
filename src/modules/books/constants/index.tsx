import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { IBook, ICategory } from "../interfaces";
import { TableActionArgs } from "@/common/interfaces/ui";
import { createTableColumns } from "@/common/utils/react-table";
import { ActionIcon, Box, Group } from "@mantine/core";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { opacityColor } from "@/common/utils/theme";

export const BOOK_CATEGORIES = "book-categories";
export const BOOKS = "books";
export const BOOK = "book";

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

export const booksCols = ({
  onDelete,
}: Omit<TableActionArgs<IBook>, "onEdit">) => {
  return createTableColumns<IBook>(({ accessor }) => [
    accessor("imageUrl", {
      header: "Cover",
      cell: ({ row }) => {
        return (
          <Box
            sx={(theme) => ({
              width: "90px",
              height: "120px",
              position: "relative",
              backgroundColor: opacityColor(theme.colors.gray[8], 30),
            })}
          >
            {row.original.imageUrl ? (
              <Image
                fill
                src={row.original.imageUrl}
                alt={`${row.original.judul} Thumb`}
                style={{ objectFit: "cover" }}
              />
            ) : null}
          </Box>
        );
      },
    }),
    accessor("judul", {
      header: "Judul",
    }),
    accessor("kodeBuku", {
      header: "Kode Buku",
    }),
    accessor("kategori.nama", {
      header: "Kategori",
    }),
    accessor("tahunTerbit", {
      header: "Tahun Terbit",
      justifyBody: "center",
      justifyHeader: "center",
    }),
    accessor("penerbit", {
      header: "Penerbit",
    }),
    accessor("jumlahHalaman", {
      header: "Jumlah Halaman",
      justifyBody: "center",
      justifyHeader: "center",
    }),
    accessor("nomorRak", {
      header: "Nomor Rak",
      justifyBody: "center",
      justifyHeader: "center",
    }),
    {
      header: "Aksi",
      justifyHeader: "center",
      cell: ({ row }) => {
        return (
          <Group spacing="xs" noWrap position="center" w="100%">
            <Link href={`/admin/books/edit/${row.original.id}`}>
              <ActionIcon color="primary" variant="filled">
                <HiPencilAlt />
              </ActionIcon>
            </Link>
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
