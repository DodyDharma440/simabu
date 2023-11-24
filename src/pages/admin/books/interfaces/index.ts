import { BasicData } from "@/common/interfaces/api";

export interface IBookCategory extends BasicData {
  nama: string;
}

export interface IBookCategoryInput extends Pick<IBookCategory, "nama"> {}
