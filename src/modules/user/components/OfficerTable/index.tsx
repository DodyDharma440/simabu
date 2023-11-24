import React, { useCallback, useMemo } from "react";
import { Box, Button, Group } from "@mantine/core";
import { AlertDialog, DataTable } from "@/common/components";
import {
  useDataTableLifecycle,
  useDisclosureData,
  useModalForm,
  useServerDataTable,
} from "@/common/hooks";
import { useDeleteOfficer, useGetOfficers } from "@/user/actions";
import { officerCols } from "@/user/constants";
import { IOfficerInput } from "@/user/interfaces";
import OfficerForm from "../OfficerForm";
import { divideBasicData } from "@/common/utils/react-query";

const OfficerTable = () => {
  const {
    paginationProps,
    perPageProps,
    searchProps,
    tableLifecycleProps,
    tableParams,
  } = useServerDataTable();
  const { data, isLoading, isRefetching, error, refetch } = useGetOfficers({
    urlParams: `?${tableParams}`,
  });

  const { isFormOpen, onAdd, onCloseForm, onEdit, editData } =
    useModalForm<IOfficerInput>();

  const [isOpenDelete, { open: openDelete, close: closeDelete }, deleteData] =
    useDisclosureData<number>();
  const { mutate: deleteOfficer, isPending: isLoadingDelete } =
    useDeleteOfficer({
      onSuccess: closeDelete,
    });

  const officers = useMemo(() => {
    return data?.data.data.nodes || [];
  }, [data?.data.data]);

  const handleDelete = useCallback(() => {
    if (deleteData) {
      deleteOfficer({ id: deleteData });
    }
  }, [deleteData, deleteOfficer]);

  const columns = useMemo(() => {
    return officerCols({
      onEdit: (data) => {
        const {
          divided: { userId, user, ...divided },
        } = divideBasicData(data);
        onEdit(
          {
            ...divided,
            username: user?.username || "",
            roleId: user?.roleId || 0,
          },
          data.id
        );
      },
      onDelete: openDelete,
    });
  }, [onEdit, openDelete]);

  useDataTableLifecycle({
    refetcher: refetch,
    total: data?.data.data.totalCount,
    ...tableLifecycleProps,
  });

  return (
    <Box py="md">
      <Group position="right" mb="xs">
        <Button onClick={onAdd}>Tambah Petugas</Button>
      </Group>

      <DataTable.Wrapper content="search-perpage">
        <DataTable.PerPage {...perPageProps} />
        <DataTable.Search {...searchProps} />
      </DataTable.Wrapper>

      <DataTable.Container paginationProps={paginationProps}>
        <DataTable
          data={officers}
          columns={columns}
          isLoading={isLoading}
          isRefetching={isRefetching}
          error={error}
        />
      </DataTable.Container>

      <OfficerForm
        isOpen={isFormOpen}
        onClose={onCloseForm}
        editData={editData}
      />

      <AlertDialog
        isOpen={isOpenDelete}
        onClose={closeDelete}
        title="Hapus Petugas"
        message="Apakah Anda yakin untuk menghapus petugas ini?"
        cancelButtonText="Batal"
        confirmButtonText="Hapus"
        onCancel={closeDelete}
        onConfirm={handleDelete}
        confirmButtonProps={{ loading: isLoadingDelete }}
      />
    </Box>
  );
};

export default OfficerTable;
