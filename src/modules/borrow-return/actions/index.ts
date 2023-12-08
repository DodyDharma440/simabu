import { post } from "@/common/utils/react-query";
import { IBorrowInput } from "../interfaces";
import { apiSimabu } from "@/common/configs/api";

export const useBorrowBook = post<any, IBorrowInput>(
  ({ formValues }) => apiSimabu.post("/borrow/student", formValues),
  [],
  { successMessage: "Pengajuan peminjaman berhasil dilakukan" }
);
