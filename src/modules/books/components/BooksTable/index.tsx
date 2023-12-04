import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import { Box, Button, Group } from "@mantine/core";
import { AlertDialog, DataTable } from "@/common/components";
import {
  useDataTableLifecycle,
  useDisclosureData,
  useServerDataTable,
} from "@/common/hooks";
import { useDeleteBook, useGetBooks } from "@/books/actions";
import { booksCols } from "@/books/constants";

const BooksTable = () => {
  const {
    paginationProps,
    perPageProps,
    searchProps,
    tableLifecycleProps,
    tableParams,
  } = useServerDataTable();
  const { data, isLoading, isRefetching, error, refetch } = useGetBooks({
    urlParams: `?${tableParams}`,
  });

  const [isOpenDelete, { open: openDelete, close: closeDelete }, deleteData] =
    useDisclosureData<number>();
  const { mutate: deleteBook, isPending: isLoadingDelete } = useDeleteBook({
    onSuccess: closeDelete,
  });

  const books = useMemo(() => {
    return data?.data.data.nodes || [];
  }, [data?.data.data]);

  const handleDelete = useCallback(() => {
    if (deleteData) {
      deleteBook({ id: deleteData });
    }
  }, [deleteData, deleteBook]);

  const columns = useMemo(() => {
    return booksCols({
      onDelete: openDelete,
    });
  }, [openDelete]);

  useDataTableLifecycle({
    refetcher: refetch,
    total: data?.data.data.totalCount,
    ...tableLifecycleProps,
  });

  return (
    <Box py="md">
      <Group position="right" mb="xs">
        <Link href="/admin/books/create">
          <Button>Tambah Buku</Button>
        </Link>
      </Group>

      <DataTable.Wrapper content="search-perpage">
        <DataTable.PerPage {...perPageProps} />
        <DataTable.Search {...searchProps} />
      </DataTable.Wrapper>

      <DataTable.Container paginationProps={paginationProps}>
        <DataTable
          data={books}
          columns={columns}
          isLoading={isLoading}
          isRefetching={isRefetching}
          error={error}
        />
      </DataTable.Container>

      <AlertDialog
        isOpen={isOpenDelete}
        onClose={closeDelete}
        title="Hapus Buku"
        message="Apakah Anda yakin untuk menghapus buku ini?"
        cancelButtonText="Batal"
        confirmButtonText="Hapus"
        onCancel={closeDelete}
        onConfirm={handleDelete}
        confirmButtonProps={{ loading: isLoadingDelete }}
      />
    </Box>
  );
};

export default BooksTable;
