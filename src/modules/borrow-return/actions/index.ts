import { get, patch, post } from "@/common/utils/react-query";
import {
  IBookReturn,
  IBookReturnConfirmInput,
  IBookReturnInput,
  IBorrow,
  IBorrowApprovalInput,
  IBorrowInput,
} from "../interfaces";
import { apiSimabu } from "@/common/configs/api";
import {
  BOOK_RETURNS,
  BORROWS,
  CURRENT_SUBMISSION,
  IS_BORROWING,
  STUDENT_HISTORY,
} from "../constants";
import { PaginationResponse } from "@/common/interfaces/api";

export const useBorrowBook = post<any, IBorrowInput>(
  ({ formValues }) => apiSimabu.post("/borrow/student", formValues),
  [],
  { successMessage: "Pengajuan peminjaman berhasil dilakukan" }
);

export const useCreateBookReturn = post<IBookReturn, IBookReturnInput>(
  ({ formValues }) => apiSimabu.post("/book-return/student", formValues),
  [CURRENT_SUBMISSION],
  { successMessage: "Pengajuan pengembalian berhasil dilakukan" }
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

export const useGetBookReturns = get<PaginationResponse<IBookReturn>>(
  (args, ctx) =>
    apiSimabu.get(`/book-return${args?.urlParams || ""}`, {
      signal: ctx?.signal,
    }),
  [BOOK_RETURNS]
);

export const useConfirmBookReturn = patch<IBookReturn, IBookReturnConfirmInput>(
  ({ formValues, id }) =>
    apiSimabu.patch(`/book-return/${id}/confirm`, formValues),
  [BOOK_RETURNS],
  { successMessage: "Konfirmasi pengembalian berhasil" }
);

export const useGetStudentHistory = get<IBorrow[]>(
  (args, ctx) =>
    apiSimabu.get(`/borrow/student${args?.urlParams || ""}`, {
      signal: ctx?.signal,
    }),
  [STUDENT_HISTORY]
);
