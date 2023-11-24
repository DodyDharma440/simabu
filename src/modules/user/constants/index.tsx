import { z } from "zod";
import { createTableColumns } from "@/common/utils/react-table";
import { IOfficer } from "../interfaces";

export const OFFICERS_MASTER = "officers-master";

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

export const officerCols = () => {
  return createTableColumns<IOfficer>(({ accessor }) => [
    accessor((row) => row.user?.username || "", {
      header: "Username",
      id: "username",
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
  ]);
};
