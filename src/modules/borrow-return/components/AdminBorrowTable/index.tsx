import React, { useCallback, useMemo, useState } from "react";
import { Box, Select } from "@mantine/core";
import { AlertDialog, DataTable } from "@/common/components";
import {
  useDataTableLifecycle,
  useDisclosureData,
  useServerDataTable,
} from "@/common/hooks";
import {
  useBorrowApproval,
  useGetBorrowSubmissions,
} from "@/borrow-return/actions";
import { borrowsColumns, statusOptions } from "@/borrow-return/constants";
import { IBorrow } from "@/borrow-return/interfaces";

const AdminBorrowTable = () => {
  const [status, setStatus] = useState(statusOptions[0]);

  const [
    isOpenApprove,
    { open: openApprove, close: closeApprove },
    approveData,
  ] = useDisclosureData<IBorrow & { mode: "approve" | "reject" }>();
  const [isOpenDetail, { open: openDetail, close: closeDetail }, detailData] =
    useDisclosureData<IBorrow>();

  const { mutate: approval, isPending: isLoadingApprove } = useBorrowApproval({
    onSuccess: () => closeApprove(),
  });

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
      onApprove: (data, mode) => openApprove({ ...data, mode }),
      onDetail: (data) => openDetail(data),
    });
  }, [openApprove, openDetail]);

  const handleApprove = useCallback(() => {
    if (approveData) {
      approval({
        formValues: {
          status: approveData.mode === "approve" ? "Diterima" : "Ditolak",
        },
        id: approveData.id,
      });
    }
  }, [approval, approveData]);

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

      <AlertDialog
        isOpen={isOpenApprove}
        onClose={closeApprove}
        title="Approval Pengajuan"
        message={`Apakah Anda yakin untuk ${
          approveData?.mode === "approve" ? "menyetujui" : "menolak"
        } pengajuan ini?`}
        cancelButtonText="Batal"
        confirmButtonText={
          approveData?.mode === "approve" ? "Setujui" : "Tolak"
        }
        onCancel={closeApprove}
        onConfirm={handleApprove}
        confirmButtonProps={{ loading: isLoadingApprove }}
      />
    </Box>
  );
};

export default AdminBorrowTable;
