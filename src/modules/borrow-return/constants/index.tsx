import dayjs from "dayjs";
import {
  BorrowPeriod,
  BorrowStatus,
  IBookReturn,
  IBorrow,
} from "../interfaces";
import { createTableColumns } from "@/common/utils/react-table";
import { Badge, Button, Group, Text } from "@mantine/core";
import { currencyFormat } from "@/common/utils/number-format";

export const IS_BORROWING = "is-borrowing";
export const BORROWS = "borrows";
export const CURRENT_SUBMISSION = "current-submission";
export const BOOK_RETURNS = "book-returns";

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
export const statusColors: Record<BorrowStatus, string> = {
  Pengajuan: "yellow",
  Diterima: "green",
  Ditolak: "red",
  Selesai: "blue",
};

type BorrowColArgs = {
  onApprove: (data: IBorrow, approval: "reject" | "approve") => void;
  onDetail: (data: IBorrow) => void;
};

export const borrowsColumns = ({ onApprove, onDetail }: BorrowColArgs) =>
  createTableColumns<IBorrow>(({ accessor }) => {
    return [
      accessor("mahasiswa.nama", {
        header: "Nama Mahasiswa",
      }),
      accessor((row) => dayjs(row.createdAt).format("DD MMM YYYY"), {
        header: "Tanggal Pengajuan",
        id: "tanggal",
      }),
      accessor("periode", {
        header: "Periode Peminjaman",
        id: "periode",
      }),
      accessor("status", {
        header: "Status",
        justifyBody: "center",
        justifyHeader: "center",
        cell: ({ row }) => {
          return (
            <Badge
              color={statusColors[row.original.status]}
              variant="dot"
              py="sm"
            >
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

type BookReturnColArgs = {
  onConfirm: (data: IBookReturn) => void;
};

export const bookReturnsColumns = ({ onConfirm }: BookReturnColArgs) =>
  createTableColumns<IBookReturn>(({ accessor }) => [
    accessor("peminjaman.mahasiswa.nama", {
      header: "Nama Mahasiswa",
    }),
    accessor((row) => dayjs(row.createdAt).format("DD MMM YYYY"), {
      header: "Tanggal Pengajuan",
      id: "tanggal",
    }),
    accessor(
      (row) =>
        row.tanggalPengembalian
          ? dayjs(row.tanggalPengembalian).format("DD MMM YYYY")
          : "-",
      {
        header: "Tanggal Konfirmasi",
        id: "tanggal_konfirmasi",
      }
    ),
    accessor((row) => (row.denda ? currencyFormat(row.denda) : "-"), {
      header: "Denda",
      id: "denda",
    }),
    {
      header: "Peminjaman",
      id: "peminjaman",
      justifyHeader: "center",
      justifyBody: "center",
      cell: ({ row }) => {
        return (
          <Button compact onClick={() => onConfirm(row.original)}>
            Lihat detail
          </Button>
        );
      },
    },
    {
      header: "Aksi",
      id: "action",
      justifyHeader: "center",
      justifyBody: "center",
      cell: ({ row }) => {
        return (
          <>
            {!row.original.isApproved ? (
              <Button
                compact
                color="green"
                onClick={() => onConfirm(row.original)}
              >
                Konfirmasi
              </Button>
            ) : null}
          </>
        );
      },
    },
  ]);
