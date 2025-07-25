import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Alert,
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
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AlertDialog, Loader } from "@/common/components";
import {
  useCreateBookReturn,
  useGetCurrentBorrowSubmission,
} from "@/borrow-return/actions";
import { statusColors } from "@/borrow-return/constants";
import { BorrowStatus } from "@/borrow-return/interfaces";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { opacityColor } from "@/common/utils/theme";

type DetailGroupProps = {
  label: React.ReactNode;
  value: React.ReactNode;
};

export const DetailGroup: React.FC<DetailGroupProps> = ({ label, value }) => {
  return (
    <Group align="flex-start" position="apart" noWrap>
      <Text size="sm">{label}</Text>
      <Text size="sm" weight="bold">
        {value}
      </Text>
    </Group>
  );
};

const alerts: Record<
  Exclude<BorrowStatus, "Pengajuan" | "Selesai">,
  JSX.Element
> = {
  Diterima: (
    <Alert
      variant="filled"
      icon={<HiOutlineCheckCircle />}
      color="green"
      title="Pengajuan diterima"
    >
      Selamat! Pengajuan peminjaman buku telah diterima oleh petugas
      perpustakaan. Silahkan langsung menuju perpustakaan untuk mengambil buku.
    </Alert>
  ),
  Ditolak: (
    <Alert
      variant="filled"
      icon={<HiOutlineExclamationCircle />}
      color="red"
      title="Pengajuan ditolak"
    >
      Pengajuan peminjaman buku ditolak. Silahkan coba mengajukan ulang dengan
      buku yang berbeda.
    </Alert>
  ),
};

const StudentSubmission = () => {
  const { data, isLoading, isRefetching, error } =
    useGetCurrentBorrowSubmission();

  const [isOpen, { open, close }] = useDisclosure();
  const { mutate: createBookReturn, isPending: isLoadingCreate } =
    useCreateBookReturn({
      onSuccess: close,
    });

  const submission = useMemo(() => {
    return data?.data.data;
  }, [data?.data.data]);

  const handleBookReturn = useCallback(() => {
    createBookReturn({
      formValues: {
        peminjamanId: submission?.id || 0,
      },
    });
  }, [createBookReturn, submission?.id]);

  return (
    <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
      {submission ? (
        <>
          {["Diterima", "Ditolak"].includes(submission.status) ? (
            <Box mb="md">
              {submission.isBookReturnSubmission ? (
                <Alert
                  variant="filled"
                  icon={<HiOutlineCheckCircle />}
                  title="Pengajuan pengembalian"
                >
                  Pengajuan pengembalian sudah dilakukan. Silahkan pergi ke
                  perpustakaan dengan membawa buku yang dipinjam agar dapat
                  dikonfirmasi oleh petugas perpustakaan.
                </Alert>
              ) : (
                <>{alerts[submission.status as "Diterima" | "Ditolak"]}</>
              )}
            </Box>
          ) : null}
          <Card p="md" radius="md" withBorder>
            <Group position="apart">
              <Text weight="bold" size="sm">
                Pengajuan peminjaman
              </Text>
              <Badge color={statusColors[submission.status]}>
                {submission.status}
              </Badge>
            </Group>
            <Divider my="sm" />
            <Stack spacing="xs">
              <DetailGroup
                label="Tanggal pengajuan"
                value={
                  submission.createdAt
                    ? dayjs(submission.createdAt).format("DD MMMM YYYY")
                    : "-"
                }
              />
              <DetailGroup label="Periode" value={submission.periode} />
              <DetailGroup
                label="Tanggal peminjaman"
                value={
                  submission.tanggalPeminjaman
                    ? dayjs(submission.tanggalPeminjaman).format("DD MMMM YYYY")
                    : "-"
                }
              />
              <DetailGroup
                label="Tanggal kembali"
                value={
                  submission.tanggalKembali
                    ? dayjs(submission.tanggalKembali).format("DD MMMM YYYY")
                    : "-"
                }
              />
              <DetailGroup
                label="Nama petugas"
                value={submission.petugas?.nama || "-"}
              />
              <DetailGroup
                label="Jumlah buku"
                value={submission.DetailPeminjaman.length || 0}
              />
            </Stack>
            <Divider my="sm" />
            <Text weight="bold" size="sm" mb="sm">
              Detail buku
            </Text>
            <Stack spacing="xs">
              {submission.DetailPeminjaman.map((borrow, index) => {
                return (
                  <Group key={index} noWrap>
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
                      {borrow.buku?.imageUrl ? (
                        <Image
                          fill
                          src={borrow.buku?.imageUrl}
                          alt={`${borrow.buku?.judul} Cover`}
                          style={{ objectFit: "cover" }}
                        />
                      ) : null}
                    </Box>

                    <Stack w="100%" spacing="0px" sx={{ flex: 1 }}>
                      <Badge w="fit-content" mb="4px">
                        {borrow.buku?.kategori?.nama}
                      </Badge>
                      <Title order={4}>{borrow.buku?.judul}</Title>
                      <Text size="xs">
                        Penerbit: {borrow.buku?.penerbit} |{" "}
                        {borrow.buku?.jumlahHalaman} Halaman
                      </Text>
                      <Text size="xs" color="dimmed">
                        Ditulis oleh: {borrow.buku?.penulis || "-"}
                      </Text>
                    </Stack>
                  </Group>
                );
              })}
            </Stack>
            {submission.status === "Diterima" &&
            !submission.isBookReturnSubmission ? (
              <>
                <Divider my="sm" />
                <Group position="right">
                  <Button onClick={open}>Ajukan Pengembalian</Button>
                </Group>
                <AlertDialog
                  isOpen={isOpen}
                  onClose={close}
                  title="Ajukan pengembalian"
                  message="Apakah Anda yakin untuk mengajukan pengembalian buku ini?"
                  cancelButtonText="Batal"
                  confirmButtonText="Ajukan"
                  onCancel={close}
                  onConfirm={handleBookReturn}
                  confirmButtonProps={{ loading: isLoadingCreate }}
                />
              </>
            ) : null}
          </Card>
        </>
      ) : (
        <Stack spacing="md" align="center">
          <Alert
            sx={{ width: "100%" }}
            icon={<HiOutlineExclamationCircle />}
            title="Belum ada data pengajuan"
            styles={{ title: { marginBottom: "0" } }}
            color="gray"
          >
            <></>
          </Alert>

          <Link href="/">
            <Button>Explore Buku</Button>
          </Link>
        </Stack>
      )}
    </Loader>
  );
};

export default StudentSubmission;
