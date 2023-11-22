import { createTableColumns } from "@/common/utils/react-table";
import { IOfficer } from "../interfaces";

export const OFFICERS_MASTER = "officers-master";

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
