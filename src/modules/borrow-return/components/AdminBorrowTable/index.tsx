import React, { useMemo, useState } from "react";
import { Box, Select } from "@mantine/core";
import { DataTable } from "@/common/components";
import { useDataTableLifecycle, useServerDataTable } from "@/common/hooks";
import { useGetBorrowSubmissions } from "@/borrow-return/actions";
import { borrowsColumns, statusOptions } from "@/borrow-return/constants";

const AdminBorrowTable = () => {
  const [status, setStatus] = useState(statusOptions[0]);

  const {
    paginationProps,
    perPageProps,
    searchProps,
    tableLifecycleProps,
    tableParams,
  } = useServerDataTable();
  const { data, isLoading, isRefetching, error, refetch } =
    useGetBorrowSubmissions({
      urlParams: `?${tableParams}${
        status === "Semua status" ? "" : `&status=${status}`
      }`,
    });

  const borrowsData = useMemo(() => {
    return data?.data.data.nodes || [];
  }, [data?.data.data.nodes]);

  const tableColumns = useMemo(() => {
    return borrowsColumns({
      onApprove: () => {},
      onDetail: () => {},
    });
  }, []);

  useDataTableLifecycle({
    refetcher: refetch,
    total: data?.data.data.totalCount,
    deps: {
      refetch: [status],
      resetPage: [status],
    },
    ...tableLifecycleProps,
  });

  return (
    <Box py="md">
      <Select
        value={status}
        onChange={(val) => setStatus(val || statusOptions[0])}
        label="Status"
        placeholder="Pilih Status"
        data={statusOptions}
        sx={{ width: "fit-content" }}
        mb="md"
      />
      <DataTable.Wrapper content="search-perpage">
        <DataTable.PerPage {...perPageProps} />
        <DataTable.Search {...searchProps} />
      </DataTable.Wrapper>

      <DataTable.Container paginationProps={paginationProps}>
        <DataTable
          data={borrowsData}
          columns={tableColumns}
          isLoading={isLoading}
          isRefetching={isRefetching}
          error={error}
        />
      </DataTable.Container>
    </Box>
  );
};

export default AdminBorrowTable;
