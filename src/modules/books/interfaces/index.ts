import { BasicData } from "@/common/interfaces/api";

export interface IBookCategory extends BasicData {
  nama: string;
}

export interface IBookCategoryInput extends Pick<IBookCategory, "nama"> {}

export interface IBook extends BasicData {
  judul: string;
  kodeBuku: string;
  imageUrl: string | null;
  penerbit: string;
  tahunTerbit: number;
  jumlahHalaman: number;
  penulis: string | null;
  nomorRak: number;
  stok: number;
  kategoriId: number;
  kategori?: IBookCategory;
}

export interface IBookInput extends Omit<IBook, keyof BasicData | "kategori"> {}

export interface IBookInputUi extends IBookInput {
  tahunTerbitDate: Date | null;
  imageFile: File | null;
}

export interface ICategory extends BasicData {
  nama: string;
}

export interface ICategoryInput extends Pick<ICategory, "nama"> {}
