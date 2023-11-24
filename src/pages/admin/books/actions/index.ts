import { PaginationResponse } from "@/common/interfaces/api";
import { get, patch, post, remove } from "@/common/utils/react-query";
import { apiSimabu } from "@/common/configs/api";
import { IBookCategory, IBookCategoryInput } from "../interfaces";
import { BOOK_CATEGORIES } from "../constants";

export const useGetBookCategories = get<PaginationResponse<IBookCategory>>(
  (args) => apiSimabu.get(`/book-category${args?.urlParams}`),
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
  ({ id }) => apiSimabu.post(`/book-category/${id}`),
  [BOOK_CATEGORIES],
  { successMessage: "Kategori buku berhasil dihapus" }
);
