import React, { useCallback, useMemo } from "react";
import { Box, Button, Group } from "@mantine/core";
import { AlertDialog, DataTable } from "@/common/components";
import {
  useDataTableLifecycle,
  useDisclosureData,
  useModalForm,
  useServerDataTable,
} from "@/common/hooks";
import { divideBasicData } from "@/common/utils/react-query";
import { useDeleteStudent, useGetStudents } from "@/user/actions";
import { studentCols } from "@/user/constants";
import { IStudentInput } from "@/user/interfaces";
import StudentForm from "../StudentForm";

const StudentTable = () => {
  const {
    paginationProps,
    perPageProps,
    searchProps,
    tableLifecycleProps,
    tableParams,
  } = useServerDataTable();
  const { data, isLoading, isRefetching, error, refetch } = useGetStudents({
    urlParams: `?${tableParams}`,
  });

  const { isFormOpen, onAdd, onCloseForm, onEdit, editData } =
    useModalForm<IStudentInput>();

  const [isOpenDelete, { open: openDelete, close: closeDelete }, deleteData] =
    useDisclosureData<number>();
  const { mutate: deleteStudent, isPending: isLoadingDelete } =
    useDeleteStudent({
      onSuccess: closeDelete,
    });

  const students = useMemo(() => {
    return data?.data.data.nodes || [];
  }, [data?.data.data]);

  const handleDelete = useCallback(() => {
    if (deleteData) {
      deleteStudent({ id: deleteData });
    }
  }, [deleteData, deleteStudent]);

  const columns = useMemo(() => {
    return studentCols({
      onEdit: (data) => {
        const {
          divided: { userId, user, programStudi, ...divided },
        } = divideBasicData(data);
        onEdit(divided, data.id);
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
        <Button onClick={onAdd}>Tambah Mahasiswa</Button>
      </Group>

      <DataTable.Wrapper content="search-perpage">
        <DataTable.PerPage {...perPageProps} />
        <DataTable.Search {...searchProps} />
      </DataTable.Wrapper>

      <DataTable.Container paginationProps={paginationProps}>
        <DataTable
          data={students}
          columns={columns}
          isLoading={isLoading}
          isRefetching={isRefetching}
          error={error}
        />
      </DataTable.Container>

      <StudentForm
        isOpen={isFormOpen}
        onClose={onCloseForm}
        editData={editData}
      />

      <AlertDialog
        isOpen={isOpenDelete}
        onClose={closeDelete}
        title="Hapus Mahasiswa"
        message="Apakah Anda yakin untuk menghapus mahasiswa ini?"
        cancelButtonText="Batal"
        confirmButtonText="Hapus"
        onCancel={closeDelete}
        onConfirm={handleDelete}
        confirmButtonProps={{ loading: isLoadingDelete }}
      />
    </Box>
  );
};

export default StudentTable;
