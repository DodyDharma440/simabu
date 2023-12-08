import React from "react";
import Link from "next/link";
import { useUserProfile } from "@/auth/hooks";
import { IBook } from "@/books/interfaces";
import { Badge, Box, Text } from "@mantine/core";
import { opacityColor } from "@/common/utils/theme";

type BookCardProps = {
  book: IBook;
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { userData } = useUserProfile();

  return (
    <Link href={userData ? `/borrow?book_id=${book.id}` : "/login"}>
      <Box>
        <Box
          h="200px"
          w="100%"
          sx={(theme) => ({
            backgroundColor: opacityColor(theme.colors.gray[8], 30),
            overflow: "hidden",
            position: "relative",
            borderRadius: theme.radius.md,
          })}
        >
          <Badge sx={{ position: "absolute", top: 0, left: 0 }} ml="xs" mt="xs">
            {book.kategori?.nama}
          </Badge>
        </Box>
        <Box py="4px" px="2px">
          <Text weight="700">{book.judul}</Text>
          <Text size="xs" color="dimmed">
            {book.penerbit} &bull; {book.jumlahHalaman} Halaman
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default BookCard;
