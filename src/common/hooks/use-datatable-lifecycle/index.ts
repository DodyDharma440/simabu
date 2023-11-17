/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useEffect } from "react";
import { SortType } from "../../interfaces/ui";

type useDataTableLifeCycle = {
  refetcher: () => Promise<any>;
  total?: number;
  page?: number;
  setPage?: React.Dispatch<SetStateAction<number>>;
  setTotalCount?: React.Dispatch<SetStateAction<number>>;
  perPage?: number;
  search?: string;
  sortBy?: { field: string; type: SortType };
  //   resetSelection?: () => void;
  deps?: {
    resetPage?: any[];
    refetch?: any[];
    // resetSelection?: any[];
  };
};

export const useDataTableLifecycle = ({
  refetcher,
  page,
  perPage,
  search,
  setPage,
  deps,
  total,
  setTotalCount,
  sortBy,
}: useDataTableLifeCycle) => {
  useEffect(() => {
    if (typeof total !== "undefined" && setTotalCount) {
      setTotalCount(total || 0);
    }
  }, [setTotalCount, total]);

  useEffect(() => {
    refetcher();
  }, [page, perPage, refetcher, search, sortBy, ...(deps?.refetch || [])]);

  useEffect(() => {
    setPage?.(1);
  }, [search, perPage, sortBy, setPage, ...(deps?.resetPage || [])]);

  //   useEffect(() => {
  //     resetSelection?.();
  //   }, [resetSelection, search, perPage, ...(deps?.resetSelection || [])]);
};
