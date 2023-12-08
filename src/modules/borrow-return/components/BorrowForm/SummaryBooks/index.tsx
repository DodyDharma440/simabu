import { IBorrowInputUi } from "@/borrow-return/interfaces";
import { opacityColor } from "@/common/utils/theme";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

const SummaryBooks = () => {
  const { control } = useFormContext<IBorrowInputUi>();
  const { fields, remove, append } = useFieldArray({ control, name: "books" });

  return (
    <Card withBorder px="md" py="sm" radius="md">
      <Box>
        <Title order={5}>Buku yang dipinjam</Title>
        <Text size="xs" color="dimmed">
          Anda hanya bisa meminjam maksimal 3 buku
        </Text>
      </Box>
      <Divider my="xs" />
      {fields.map((field, index) => {
        return (
          <React.Fragment key={field.id}>
            {index > 0 ? <Divider my="xs" /> : null}
            <Group>
              <Box
                h="100px"
                w="80px"
                sx={(theme) => ({
                  backgroundColor: opacityColor(theme.colors.gray[8], 30),
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: theme.radius.md,
                })}
              ></Box>

              <Stack spacing="0px" sx={{ flex: 1 }}>
                <Badge w="fit-content" mb="4px">
                  {field.kategori?.nama}
                </Badge>
                <Title order={4}>{field.judul}</Title>
                <Text size="xs">
                  Penerbit: {field.penerbit} | {field.jumlahHalaman} Halaman
                </Text>
                <Text size="xs" color="dimmed">
                  Ditulis oleh: {field.penulis || "-"}
                </Text>
              </Stack>

              {fields.length > 1 ? (
                <ActionIcon color="red" size="lg" variant="light">
                  <HiOutlineTrash />
                </ActionIcon>
              ) : null}
            </Group>
          </React.Fragment>
        );
      })}
      {fields.length < 3 ? (
        <Button leftIcon={<HiOutlinePlus />} fullWidth mt="md" variant="light">
          Tambahkan Buku Lainnya
        </Button>
      ) : null}
    </Card>
  );
};

export default SummaryBooks;
