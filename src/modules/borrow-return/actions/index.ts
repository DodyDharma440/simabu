import { get, patch, post } from "@/common/utils/react-query";
import { IBorrow, IBorrowApprovalInput, IBorrowInput } from "../interfaces";
import { apiSimabu } from "@/common/configs/api";
import { BORROWS, CURRENT_SUBMISSION, IS_BORROWING } from "../constants";
import { PaginationResponse } from "@/common/interfaces/api";

export const useBorrowBook = post<any, IBorrowInput>(
  ({ formValues }) => apiSimabu.post("/borrow/student", formValues),
  [],
  { successMessage: "Pengajuan peminjaman berhasil dilakukan" }
);

export const useGetIsBorrowing = get<boolean>(
  () => apiSimabu.get("/borrow/student/check-is-borrow"),
  [IS_BORROWING]
);

export const useGetBorrowSubmissions = get<PaginationResponse<IBorrow>>(
  (args, ctx) =>
    apiSimabu.get(`/borrow${args?.urlParams || ""}`, { signal: ctx?.signal }),
  [BORROWS]
);

export const useBorrowApproval = patch<any, IBorrowApprovalInput>(
  ({ formValues, id }) => apiSimabu.patch(`/borrow/${id}/approval`, formValues),
  [BORROWS],
  { successMessage: "Pengajuan peminjaman berhasil diperbarui" }
);

export const useGetCurrentBorrowSubmission = get<IBorrow>(
  () => apiSimabu.get("/borrow/student/submission"),
  [CURRENT_SUBMISSION]
);
