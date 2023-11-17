import { useCallback, useMemo, useState } from "react";
import { DataTablePaginationProps } from "../../components/DataTable/Pagination";
import { DataTablePerPageProps } from "../../components/DataTable/PerPage";

export type UseDataTablePagination = {
  page?: number;
  perPage?: number;
  paramNames?: {
    page?: string;
    perPage?: string;
  };
};

export const useDataTablePagination = (props?: UseDataTablePagination) => {
  const [page, setPage] = useState(props?.page || 1);
  const [perPage, setPerPage] = useState(props?.perPage || 10);

  const paramNames = useMemo((): Record<"page" | "perPage", string> => {
    if (!props?.paramNames) {
      return {
        page: "page",
        perPage: "perPage",
      };
    }
    const { paramNames } = props;

    return {
      page: paramNames.page || "page",
      perPage: paramNames.perPage || "perPage",
    };
  }, [props]);

  const [totalCount, setTotalCount] = useState(0);

  const totalPages = useMemo(() => {
    return Math.ceil((totalCount || 0) / perPage);
  }, [perPage, totalCount]);

  const hasNextPage = useMemo(() => {
    return page < totalPages;
  }, [page, totalPages]);

  const hasPrevPage = useMemo(() => {
    return page > 1;
  }, [page]);

  const onNext = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const onPrev = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);

  const paginationParams = useMemo(() => {
    const params = new URLSearchParams();
    params.append(paramNames.page, `${page}`);
    params.append(paramNames.perPage, `${perPage}`);
    return params.toString();
  }, [page, paramNames.page, paramNames.perPage, perPage]);

  const paginationProps: DataTablePaginationProps = {
    total: totalCount,
    perPage,
    currentPage: page,
    totalPages,
    onPrev,
    onNext,
    hasPrevPage,
    hasNextPage,
  };

  const perPageProps: DataTablePerPageProps = {
    perPage,
    onChange: (val) => setPerPage(val),
  };

  const paginationLifecycle = {
    page,
    setPage,
    perPage,
    setTotalCount,
  };

  return {
    page,
    perPage,
    setPerPage,
    setPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    onNext,
    onPrev,
    paginationParams,
    paginationProps,
    perPageProps,
    setTotalCount,
    paginationLifecycle,
  };
};
