import { IBook } from "@/books/interfaces";
import { BasicData } from "@/common/interfaces/api";
import { IOfficer, IStudent } from "@/user/interfaces";

export type BorrowPeriod = "3 Hari" | "5 Hari" | "1 Minggu" | "2 Minggu";
export type BorrowStatus = "Pengajuan" | "Diterima" | "Ditolak" | "Selesai";

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

export interface IBorrowDetail extends BasicData {
  buku?: IBook;
  bukuId: number;
}

export interface IBorrow extends BasicData {
  status: BorrowStatus;
  mahasiswaId: number;
  mahasiswa?: IStudent;
  petugasId: number | null;
  petugas?: IOfficer | null;
  tanggalPeminjaman: string | null;
  periode: string;
  tanggalKembali: string | null;
  isBookReturnSubmission: boolean;
  flagHistory?: boolean | null;
  DetailPeminjaman: IBorrowDetail[];
  Pengembalian?: IBookReturn;
}

export interface IBookReturn extends BasicData {
  tanggalPengembalian: string | null;
  petugasPenerima?: IOfficer;
  petugasId: number | null;
  petugas?: IOfficer | null;
  denda: number | null;
  peminjamanId: number;
  peminjaman?: IBorrow;
  isApproved: boolean;
}

export interface IBookReturnInput extends Pick<IBookReturn, "peminjamanId"> {}

export interface IBookReturnConfirmInput extends Pick<IBookReturn, "denda"> {}
