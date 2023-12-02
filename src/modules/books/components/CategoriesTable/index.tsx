import React, { useCallback, useMemo } from "react";
import { Box, Button, Group } from "@mantine/core";
import { AlertDialog, DataTable } from "@/common/components";
import {
  useDataTableLifecycle,
  useDisclosureData,
  useModalForm,
  useServerDataTable,
} from "@/common/hooks";
import { useDeleteBookCategories, useGetBookCategories } from "@/books/actions";
import { categoriesCols } from "@/books/constants";
import { ICategoryInput } from "@/books/interfaces";
import CategoryForm from "../CategoryForm";

const CategoryTable = () => {
  const {
    paginationProps,
    perPageProps,
    searchProps,
    tableLifecycleProps,
    tableParams,
  } = useServerDataTable();
  const { data, isLoading, isRefetching, error, refetch } =
    useGetBookCategories({
      urlParams: `?${tableParams}`,
    });

  const { isFormOpen, onAdd, onCloseForm, onEdit, editData } =
    useModalForm<ICategoryInput>();

  const [isOpenDelete, { open: openDelete, close: closeDelete }, deleteData] =
    useDisclosureData<number>();
  const { mutate: deleteCategory, isPending: isLoadingDelete } =
    useDeleteBookCategories({
      onSuccess: closeDelete,
    });

  const officers = useMemo(() => {
    return data?.data.data.nodes || [];
  }, [data?.data.data]);

  const handleDelete = useCallback(() => {
    if (deleteData) {
      deleteCategory({ id: deleteData });
    }
  }, [deleteData, deleteCategory]);

  const columns = useMemo(() => {
    return categoriesCols({
      onEdit: (data) => {
        onEdit({ nama: data.nama }, data.id);
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
        <Button onClick={onAdd}>Tambah Kategori</Button>
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

      <CategoryForm
        isOpen={isFormOpen}
        onClose={onCloseForm}
        editData={editData}
      />

      <AlertDialog
        isOpen={isOpenDelete}
        onClose={closeDelete}
        title="Hapus Kategori"
        message="Apakah Anda yakin untuk menghapus kategori ini?"
        cancelButtonText="Batal"
        confirmButtonText="Hapus"
        onCancel={closeDelete}
        onConfirm={handleDelete}
        confirmButtonProps={{ loading: isLoadingDelete }}
      />
    </Box>
  );
};

export default CategoryTable;
