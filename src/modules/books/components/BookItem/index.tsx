import React from "react";
import Image from "next/image";
import { Badge, Box, Group, Stack, Text, Title } from "@mantine/core";
import { opacityColor } from "@/common/utils/theme";
import { IBook } from "@/books/interfaces";

type BookItemProps = {
  book: IBook;
};

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <Group noWrap>
      <Box
        h="100px"
        w="80px"
        sx={(theme) => ({
          backgroundColor: opacityColor(theme.colors.gray[8], 30),
          overflow: "hidden",
          position: "relative",
          borderRadius: theme.radius.md,
        })}
      >
        {book?.imageUrl ? (
          <Image
            fill
            src={book?.imageUrl}
            alt={`${book?.judul} Cover`}
            style={{ objectFit: "cover" }}
          />
        ) : null}
      </Box>

      <Stack w="100%" spacing="0px" sx={{ flex: 1 }}>
        <Badge w="fit-content" mb="4px">
          {book?.kategori?.nama}
        </Badge>
        <Title order={4}>{book?.judul}</Title>
        <Text size="xs">
          Penerbit: {book?.penerbit} | {book?.jumlahHalaman} Halaman
        </Text>
        <Text size="xs" color="dimmed">
          Ditulis oleh: {book?.penulis || "-"}
        </Text>
      </Stack>
    </Group>
  );
};

export default BookItem;
