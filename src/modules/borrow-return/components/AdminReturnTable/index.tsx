import React, { useMemo } from "react";
import {
  useDataTableLifecycle,
  useDisclosureData,
  useServerDataTable,
} from "@/common/hooks";
import { useGetBookReturns } from "@/borrow-return/actions";
import { DataTable } from "@/common/components";
import { Box } from "@mantine/core";
import { IBookReturn } from "@/borrow-return/interfaces";
import { bookReturnsColumns } from "@/borrow-return/constants";

const AdminReturnTable = () => {
  const {
    paginationProps,
    perPageProps,
    searchProps,
    tableLifecycleProps,
    tableParams,
  } = useServerDataTable();
  const { data, isLoading, isRefetching, error, refetch } = useGetBookReturns({
    urlParams: `?${tableParams}`,
  });

  const [
    isOpenConfirm,
    { open: openConfirm, close: closeConfirm },
    confirmData,
  ] = useDisclosureData<IBookReturn>();

  const bookReturns = useMemo(() => {
    return data?.data.data.nodes || [];
  }, [data?.data.data.nodes]);

  const tableColumns = useMemo(() => {
    return bookReturnsColumns({
      onConfirm: openConfirm,
    });
  }, [openConfirm]);

  useDataTableLifecycle({
    refetcher: refetch,
    total: data?.data.data.totalCount,
    ...tableLifecycleProps,
  });

  return (
    <Box py="md">
      <DataTable.Wrapper content="search-perpage">
        <DataTable.PerPage {...perPageProps} />
        <DataTable.Search {...searchProps} />
      </DataTable.Wrapper>

      <DataTable.Container paginationProps={paginationProps}>
        <DataTable
          data={bookReturns}
          columns={tableColumns}
          isLoading={isLoading}
          isRefetching={isRefetching}
          error={error}
        />
      </DataTable.Container>
    </Box>
  );
};

export default AdminReturnTable;
