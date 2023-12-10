import { IBook } from "@/books/interfaces";
import { IBorrowInputUi } from "@/borrow-return/interfaces";
import { Loader } from "@/common/components";
import { useDataTablePagination } from "@/common/hooks";
import { isDark, opacityColor } from "@/common/utils/theme";
import { useGetPublicBooks } from "@/landing-page/actions";
import { BookLists } from "@/landing-page/components";
import BookCard from "@/landing-page/components/BookCard";
import {
  ActionIcon,
  Box,
  Divider,
  Grid,
  Group,
  Portal,
  Title,
  Transition,
} from "@mantine/core";
import React, { useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { HiX } from "react-icons/hi";

type MoreBooksProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (book: IBook) => void;
};

const MoreBooks: React.FC<MoreBooksProps> = ({ isOpen, onClose, onSelect }) => {
  const { control } = useFormContext<IBorrowInputUi>();
  const bookValues = useWatch({ control, name: "books" });

  const { paginationParams } = useDataTablePagination({ perPage: 20 });
  const { data, isLoading, isRefetching, error } = useGetPublicBooks(
    { urlParams: `?${paginationParams}` },
    { enabled: isOpen }
  );

  const books = useMemo(() => {
    return (data?.data.data.nodes || []).filter((book) => {
      return !bookValues.some((b) => b.id === book.id);
    });
  }, [bookValues, data?.data.data.nodes]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <Portal>
      <Transition
        mounted={isOpen}
        transition="fade"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Box
              sx={(theme) => ({
                width: "100%",
                maxWidth: theme.breakpoints.xs,
                position: "fixed",
                bottom: "0",
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1001,
              })}
            >
              <Box
                onClick={onClose}
                sx={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Box
                  sx={(theme) => ({
                    position: "absolute",
                    inset: "0",
                    background: opacityColor(theme.colors.dark[8], 50),
                  })}
                />
              </Box>

              <Box
                sx={(theme) => ({
                  position: "absolute",
                  top: "100px",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  background: isDark(theme)
                    ? theme.colors.dark[7]
                    : theme.white,
                  borderTopLeftRadius: theme.radius.lg,
                  borderTopRightRadius: theme.radius.lg,
                })}
                py="md"
                px="lg"
              >
                <Group position="apart">
                  <Title order={4}>Tambahkan Buku</Title>
                  <ActionIcon onClick={onClose}>
                    <HiX />
                  </ActionIcon>
                </Group>
                <Divider my="xs" />
                <Loader
                  isLoading={isLoading}
                  isRefetching={isRefetching}
                  error={error}
                >
                  <Grid gutter="md">
                    {books.map((book, index) => {
                      return (
                        <Grid.Col span={6} xs={4} key={index}>
                          <BookCard
                            book={book}
                            onSelect={(book) => {
                              onSelect(book);
                              onClose();
                            }}
                          />
                        </Grid.Col>
                      );
                    })}
                  </Grid>
                </Loader>
              </Box>
            </Box>
          </div>
        )}
      </Transition>
    </Portal>
  );
};

export default MoreBooks;
