import { z } from "zod";
import { createTableColumns } from "@/common/utils/react-table";
import { IOfficer, IStudent } from "../interfaces";
import { ActionIcon, Group } from "@mantine/core";
import { HiPencilAlt } from "react-icons/hi";
import { HiTrash } from "react-icons/hi2";
import { TableActionArgs } from "@/common/interfaces/ui";

export const OFFICERS_MASTER = "officers-master";
export const STUDENTS_MASTER = "students-master";

export const petugasZodSchema = {
  nama: z.string({
    required_error: "Nama harus diisi",
  }),
  nip: z.string({
    required_error: "NIP harus diisi",
  }),
  alamat: z.string(),
  noTelp: z.string(),
  username: z.string({
    required_error: "Username harus diisi",
  }),
};

export const studentZodSchema = {
  nama: z.string({
    required_error: "Nama harus diisi",
  }),
  nim: z.string({
    required_error: "NIM harus diisi",
  }),
  alamat: z.string(),
  noTelp: z.string(),
};

export const officerCols = ({
  onEdit,
  onDelete,
}: TableActionArgs<IOfficer>) => {
  return createTableColumns<IOfficer>(({ accessor }) => [
    accessor((row) => row.user?.username || "", {
      header: "Username",
      id: "username",
    }),
    accessor("user.role.name", {
      header: "Role",
    }),
    accessor("nama", {
      header: "Nama",
    }),
    accessor("nip", {
      header: "NIP",
    }),
    accessor("alamat", {
      header: "Alamat",
    }),
    accessor("noTelp", {
      header: "No. Telp.",
    }),
    {
      id: "action",
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

export const studentCols = ({
  onEdit,
  onDelete,
}: TableActionArgs<IStudent>) => {
  return createTableColumns<IStudent>(({ accessor }) => [
    accessor("nama", {
      header: "Nama",
    }),
    accessor("nim", {
      header: "NIM",
    }),
    accessor("alamat", {
      header: "Alamat",
    }),
    accessor("noTelp", {
      header: "No. Telp.",
    }),
    {
      id: "action",
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
