import { apiSimabu } from "@/common/configs/api";
import { PaginationResponse } from "@/common/interfaces/api";
import { get } from "@/common/utils/react-query";
import { IBook } from "@/books/interfaces";
import { LANDING_PAGE_BOOKS } from "../constants";

export const useGetPublicBooks = get<PaginationResponse<IBook>>(
  (args) => apiSimabu.get(`/public/books${args?.urlParams || ""}`),
  [LANDING_PAGE_BOOKS]
);
