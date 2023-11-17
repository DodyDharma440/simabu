import { useMemo, useState } from "react";
import { SortType } from "../../interfaces/ui";

type SortBy = {
  field: string;
  type: SortType;
};

export type UseDataTableSort = {
  sortBy: SortBy;
};

export const useDataTableSort = (args?: UseDataTableSort) => {
  const [sortBy, setSortBy] = useState<SortBy>(
    args?.sortBy || {
      field: "",
      type: "default",
    }
  );

  const sortParams = useMemo(() => {
    if (sortBy.type !== "default" && sortBy.field) {
      const params = new URLSearchParams();
      params.append("sort", `${sortBy.field}:${sortBy.type}`);
      return `&${params.toString()}`;
    }
    return "";
  }, [sortBy.field, sortBy.type]);

  const sortLifecycle = {
    sortBy,
  };

  return { sortBy, setSortBy, sortParams, sortLifecycle };
};
