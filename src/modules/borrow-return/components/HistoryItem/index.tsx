import { statusColors } from "@/borrow-return/constants";
import { IBorrow } from "@/borrow-return/interfaces";
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { DetailGroup } from "../StudentSubmission";

type HistoryItemProps = {
  borrow: IBorrow;
};

const HistoryItem: React.FC<HistoryItemProps> = ({ borrow }) => {
  return (
    <Card withBorder radius="md" mb="sm">
      <Group position="apart">
        <Title order={5}>
          {borrow.tanggalPeminjaman
            ? dayjs(borrow.tanggalPeminjaman).format("DD MMMM YYYY")
            : "Invalid"}
        </Title>
        <Badge size="lg" color={statusColors[borrow.status]}>
          {borrow.status}
        </Badge>
      </Group>
      <Divider my="md" />
      <Stack spacing="xs">
        <DetailGroup label="Periode" value={borrow.periode} />

        <DetailGroup
          label="Tanggal pengembalian"
          value={
            borrow.Pengembalian?.tanggalPengembalian
              ? dayjs(borrow.Pengembalian?.tanggalPengembalian).format(
                  "DD MMMM YYYY"
                )
              : "-"
          }
        />
        <DetailGroup
          label="Jumlah buku"
          value={
            <Group>
              {borrow.DetailPeminjaman.length || 0}
              <Button size="xs" compact>
                Lihat
              </Button>
            </Group>
          }
        />
      </Stack>
    </Card>
  );
};

export default HistoryItem;
