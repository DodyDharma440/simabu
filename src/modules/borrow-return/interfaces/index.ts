import { IBook } from "@/books/interfaces";

export type BorrowPeriod = "3 Hari" | "5 Hari" | "1 Minggu" | "2 Minggu";
export type BorrowStatus = "Pengajuan" | "Diterima" | "Ditolak";

export interface IBorrowInput {
  borrowPeriod: BorrowPeriod;
  bookIds: number[];
}

export interface IBorrowInputUi extends IBorrowInput {
  books: IBook[];
}

export interface IBorrowApprovalInput {
  status: Exclude<BorrowStatus, "Pengajuan">;
}
