import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUserProfile } from "@/auth/hooks";
import { IBook } from "@/books/interfaces";
import { Badge, Box, Text } from "@mantine/core";
import { opacityColor } from "@/common/utils/theme";

type BookCardProps = {
  book: IBook;
  onSelect?: (data: IBook) => void;
  isSelected?: boolean; //
};

const BookCard: React.FC<BookCardProps> = ({ book, onSelect, isSelected }) => {
  const { userData } = useUserProfile();

  const content = (
    <Box sx={{ cursor: "pointer" }} onClick={() => onSelect?.(book)}>
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
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={`${book.judul} Cover`}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : null}
      </Box>
      <Box py="4px" px="2px">
        <Text weight="700">{book.judul}</Text>
        <Text size="xs" color="dimmed">
          {book.penerbit} &bull; {book.jumlahHalaman} Halaman
        </Text>
      </Box>
    </Box>
  );

  return (
    <>
      {!onSelect ? (
        <Link href={userData ? `/borrow?book_id=${book.id}` : "/login"}>
          {content}
        </Link>
      ) : (
        content
      )}
    </>
  );
};

export default BookCard;
