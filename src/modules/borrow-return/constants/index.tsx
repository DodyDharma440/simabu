import dayjs from "dayjs";
import { BorrowPeriod, BorrowStatus, IBorrow } from "../interfaces";
import { createTableColumns } from "@/common/utils/react-table";
import { Badge, Button, Group, Text } from "@mantine/core";

export const IS_BORROWING = "is-borrowing";
export const BORROWS = "borrows";

export const periodDates: Record<BorrowPeriod, Date> = {
  "3 Hari": dayjs().add(3, "days").toDate(),
  "5 Hari": dayjs().add(5, "days").toDate(),
  "1 Minggu": dayjs().add(7, "days").toDate(),
  "2 Minggu": dayjs().add(14, "days").toDate(),
};

export const statusOptions = [
  "Semua status",
  "Pengajuan",
  "Diterima",
  "Ditolak",
  "Selesai",
];

export const periodDayLabels: Record<string, BorrowPeriod> = {
  3: "3 Hari",
  5: "5 Hari",
  7: "1 Minggu",
  14: "2 Minggu",
};

export const periodOptions = Object.keys(periodDates);

type BorrowColArgs = {
  onApprove: (data: IBorrow, approval: "reject" | "approve") => void;
  onDetail: (data: IBorrow) => void;
};

const getPeriodFromDate = (start: string, end: string) => {
  const distance = Math.abs(dayjs(start).diff(dayjs(end), "days")) + 1;
  return periodDayLabels[distance];
};

export const borrowsColumns = ({ onApprove, onDetail }: BorrowColArgs) =>
  createTableColumns<IBorrow>(({ accessor }) => {
    return [
      accessor("mahasiswa.nama", {
        header: "Nama Mahasiswa",
      }),
      accessor((row) => dayjs(row.tanggalPeminjaman).format("DD MMM YYYY"), {
        header: "Tanggal Pengajuan",
        id: "tanggal",
      }),
      accessor(
        (row) => getPeriodFromDate(row.tanggalPeminjaman, row.tanggalKembali),
        {
          header: "Periode Peminjaman",
          id: "periode",
        }
      ),
      accessor("status", {
        header: "Status",
        justifyBody: "center",
        justifyHeader: "center",
        cell: ({ row }) => {
          const colors: Record<BorrowStatus, string> = {
            Pengajuan: "yellow",
            Diterima: "green",
            Ditolak: "red",
            Selesai: "blue",
          };

          return (
            <Badge color={colors[row.original.status]} variant="dot" py="sm">
              {row.original.status}
            </Badge>
          );
        },
      }),
      accessor((row) => row.DetailPeminjaman.length, {
        header: "Jumlah Buku",
        id: "buku",
        justifyBody: "center",
        justifyHeader: "center",
        cell: ({ row, getValue }) => {
          return (
            <Group spacing="xs" noWrap>
              <Text>{getValue()} Buku</Text>
              <Button size="sm" compact onClick={() => onDetail(row.original)}>
                Detail
              </Button>
            </Group>
          );
        },
      }),
      {
        header: "Aksi",
        id: "action",
        justifyHeader: "center",
        cell: ({ row }) => {
          return (
            <>
              {row.original.status === "Pengajuan" ? (
                <Group position="center" spacing="xs" w="100%">
                  <Button
                    compact
                    color="green"
                    onClick={() => onApprove(row.original, "approve")}
                  >
                    Setujui
                  </Button>
                  <Button
                    compact
                    color="red"
                    onClick={() => onApprove(row.original, "reject")}
                  >
                    Tolak
                  </Button>
                </Group>
              ) : null}
            </>
          );
        },
      },
    ];
  });
