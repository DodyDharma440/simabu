import { PaginationResponse } from "@/common/interfaces/api";
import { get, getById, patch, post, remove } from "@/common/utils/react-query";
import { apiSimabu } from "@/common/configs/api";
import {
  IBook,
  IBookCategory,
  IBookCategoryInput,
  IBookInput,
} from "../interfaces";
import { BOOKS, BOOK, BOOK_CATEGORIES } from "../constants";

export const useGetBookCategories = get<PaginationResponse<IBookCategory>>(
  (args) => apiSimabu.get(`/book-category${args?.urlParams || ""}`),
  [BOOK_CATEGORIES]
);

export const useCreateBookCategories = post<IBookCategory, IBookCategoryInput>(
  ({ formValues }) => apiSimabu.post("/book-category", formValues),
  [BOOK_CATEGORIES],
  { successMessage: "Kategori buku berhasil dibuat" }
);

export const useUpdateBookCategories = patch<IBookCategory, IBookCategoryInput>(
  ({ formValues, id }) => apiSimabu.patch(`/book-category/${id}`, formValues),
  [BOOK_CATEGORIES],
  { successMessage: "Kategori buku berhasil diperbarui" }
);

export const useDeleteBookCategories = remove<boolean>(
  ({ id }) => apiSimabu.delete(`/book-category/${id}`),
  [BOOK_CATEGORIES],
  { successMessage: "Kategori buku berhasil dihapus" }
);

export const useGetBooks = get<PaginationResponse<IBook>>(
  (args) => apiSimabu.get(`/book${args?.urlParams || ""}`),
  [BOOKS]
);

export const useGetBook = getById<IBook>(
  ({ id }) => apiSimabu.get(`/book/${id}`),
  (args) => [BOOK, args?.id]
);

export const useCreateBook = post<IBook, IBookInput>(
  ({ formValues }) => apiSimabu.post("/book", formValues),
  [],
  { successMessage: "Data buku berhasil dibuat" }
);

export const useUpdateBook = patch<IBook, IBookInput>(
  ({ formValues, id }) => apiSimabu.patch(`/book/${id}`, formValues),
  [],
  { successMessage: "Data buku berhasil diperbarui" }
);

export const useDeleteBook = remove<IBook>(
  ({ id }) => apiSimabu.delete(`/book/${id}`),
  [BOOKS],
  { successMessage: "Data buku berhasil dihapus" }
);
