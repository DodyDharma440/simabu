import React, { useMemo } from "react";
import { Box, Grid, Title } from "@mantine/core";
import { useGetPublicBooks } from "@/landing-page/actions";
import { Loader } from "@/common/components";
import { useDataTablePagination } from "@/common/hooks";
import BookCard from "../BookCard";

const BookLists = () => {
  const { paginationParams } = useDataTablePagination({ perPage: 20 });
  const { data, isLoading, isRefetching, error } = useGetPublicBooks({
    urlParams: `?${paginationParams}`,
  });

  const books = useMemo(() => {
    return data?.data.data.nodes || [];
  }, [data?.data.data]);

  return (
    <Box p="md" sx={{ minHeight: "600px" }}>
      <Title order={2} mb="md">
        Pilihan Buku
      </Title>

      <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
        <Grid gutter="md">
          {books.map((book, index) => {
            return (
              <Grid.Col span={6} xs={4} key={index}>
                <BookCard book={book} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Loader>
    </Box>
  );
};

export default BookLists;
