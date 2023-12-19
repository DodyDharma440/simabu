import React, { useCallback, useMemo, useState } from "react";
import { Box, Button, Group, Select } from "@mantine/core";
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
import { utils, writeFileXLSX } from "xlsx";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";
import { getErrorMessage } from "@/common/utils/react-query";

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

  const {
    isLoading: isLoadingExcel,
    isRefetching: isRefetchingExcel,
    error: errorExcel,
    refetch: refetchExcel,
  } = useGetBorrowSubmissions(
    { urlParams: `?${status === "Semua status" ? "" : `&status=${status}`}` },
    { enabled: false, uniqueKey: ["export-excel"] }
  );

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

  const handleExportExcel = useCallback(async () => {
    try {
      const { data } = await refetchExcel();

      const formatDate = (date?: string) => {
        return date ? dayjs(date).locale("id").format("DD MMMM YYYY") : "-";
      };

      const dataWorkSheet = data?.data.data.nodes?.map((item) => {
        return {
          nama: item?.mahasiswa?.nama || "",
          nim: item?.mahasiswa?.nim || "",
          tanggal_pengajuan: formatDate(item.createdAt || "") || "",
          periode: item.periode,
          status: item.status || "",
          jumlah_buku: item.DetailPeminjaman.length || 0,
        };
      });

      const worksheet = utils.json_to_sheet(dataWorkSheet || []);
      const workbook = utils.book_new();

      utils.book_append_sheet(workbook, worksheet, "Laporan Mahasiswa Aktif");
      utils.sheet_add_aoa(
        worksheet,
        [
          [
            "Nama",
            "NIM",
            "Tanggal Pengajuan",
            "Periode Peminjaman",
            "Status",
            "Jumlah Buku",
          ],
        ],
        { origin: "A1" }
      );

      writeFileXLSX(workbook, `Laporan-Peminjaman.xlsx`);
    } catch (error) {
      showNotification({
        title: "Error",
        message: getErrorMessage(error as any),
        autoClose: 5000,
        color: "red",
      });
    }
  }, [refetchExcel]);

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
      <Group w="100%" align="flex-end" mb="md" position="apart">
        <Select
          value={status}
          onChange={(val) => setStatus(val || statusOptions[0])}
          label="Status"
          placeholder="Pilih Status"
          data={statusOptions}
          sx={{ width: "fit-content" }}
        />
        <Button onClick={handleExportExcel} loading={isRefetchingExcel}>
          Export Laporan
        </Button>
      </Group>

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
