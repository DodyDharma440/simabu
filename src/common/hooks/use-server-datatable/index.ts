import {
  UseDataTableSearch,
  useDataTableSearch,
} from "../use-datatable-search";
import {
  UseDataTablePagination,
  useDataTablePagination,
} from "../use-datatable-pagination";
import { UseDataTableSort, useDataTableSort } from "../use-datatable-sort";

type UseServerDataTable<K extends string> = {
  pagination?: UseDataTablePagination;
  search?: UseDataTableSearch<K>;
  sort?: UseDataTableSort;
};

export const useServerDataTable = <K extends string = string>(
  props?: UseServerDataTable<K>
) => {
  const { paginationParams, paginationLifecycle, ...tablePagination } =
    useDataTablePagination(props?.pagination);
  const { searchParams, searchLifecycle, ...tableSearch } = useDataTableSearch(
    props?.search
  );
  const { sortParams, sortLifecycle, ...tableSort } = useDataTableSort(
    props?.sort
  );

  const tableLifecycleProps = {
    ...paginationLifecycle,
    ...searchLifecycle,
    ...sortLifecycle,
  };

  const tableParams = `${paginationParams}&${searchParams}${sortParams}`;

  return {
    tableLifecycleProps,
    tableParams,
    searchParams,
    paginationParams,
    sortParams,
    searchLifecycle,
    paginationLifecycle,
    sortLifecycle,
    ...tablePagination,
    ...tableSearch,
    ...tableSort,
  };
};
