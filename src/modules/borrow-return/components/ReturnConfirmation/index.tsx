import React, { useCallback, useMemo } from "react";
import {
  IBookReturn,
  IBookReturnConfirmInput,
} from "@/borrow-return/interfaces";
import {
  Alert,
  Button,
  Divider,
  Grid,
  Group,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import dayjs, { Dayjs } from "dayjs";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Controller, useForm } from "react-hook-form";
import { useConfirmBookReturn } from "@/borrow-return/actions";
import { BookItem } from "@/books/components";

type ReturnConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  bookReturn: IBookReturn | null;
};

const ReturnConfirmation: React.FC<ReturnConfirmationProps> = ({
  isOpen,
  onClose,
  bookReturn,
}) => {
  const { mutate: confirmBook, isPending: isLoadingConfirm } =
    useConfirmBookReturn({
      onSuccess: onClose,
    });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IBookReturnConfirmInput>({
    defaultValues: {
      denda: 0,
    },
  });

  const isFined = useMemo(() => {
    return dayjs(bookReturn?.createdAt).isAfter(
      bookReturn?.peminjaman?.tanggalKembali
    );
  }, [bookReturn?.createdAt, bookReturn?.peminjaman?.tanggalKembali]);

  const submitHandler = useCallback(
    (values: IBookReturnConfirmInput) => {
      if (!isFined) {
        values.denda = 0;
      }

      if (bookReturn) {
        confirmBook({ formValues: values, id: bookReturn?.id });
      }
    },
    [bookReturn, confirmBook, isFined]
  );

  return (
    <Modal
      size="lg"
      opened={isOpen}
      onClose={onClose}
      title={<Title order={4}>Konfirmasi Pengembalian</Title>}
    >
      <Grid mb="md">
        <Grid.Col span={6}>
          <TextInput
            value={bookReturn?.peminjaman?.mahasiswa?.nama || ""}
            placeholder="Nama mahasiswa"
            label="Nama mahasiswa"
            readOnly
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            value={bookReturn?.peminjaman?.mahasiswa?.nim || ""}
            placeholder="NIM"
            label="NIM"
            readOnly
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            value={dayjs(bookReturn?.createdAt).format("DD MMMM YYYY")}
            placeholder="Tanggal pengajuan"
            label="Tanggal pengajuan"
            readOnly
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            value={dayjs(bookReturn?.peminjaman?.tanggalKembali).format(
              "DD MMMM YYYY"
            )}
            placeholder="Tanggal kembali seharusnya"
            label="Tanggal kembali seharusnya"
            readOnly
          />
        </Grid.Col>
      </Grid>

      <Text weight="600" mb="sm">
        Detail peminjaman
      </Text>
      <Stack mb="md">
        {bookReturn?.peminjaman?.DetailPeminjaman.map((detail, index) => {
          return <BookItem key={index} book={detail.buku!} />;
        })}
      </Stack>

      {isFined ? (
        <>
          <Alert
            color="red"
            title="Pengajuan Terlambat"
            icon={<HiOutlineExclamationCircle />}
            mb="md"
          >
            Pengajuan pengembalian sudah terlambat dari tanggal kembali
            seharusnya. Silahkan inputkan denda.
          </Alert>

          <Controller
            control={control}
            name="denda"
            rules={{
              required: "Denda harus diisi",
            }}
            render={({ field }) => {
              return (
                <NumberInput
                  {...field}
                  error={errors.denda?.message}
                  value={Number(field.value || "0")}
                  hideControls
                  parser={(value) => value?.replace(/Rp\s?|(,*)/g, "")}
                  formatter={(value) => {
                    return !Number.isNaN(parseFloat(value || "0"))
                      ? `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : "Rp ";
                  }}
                />
              );
            }}
          />
        </>
      ) : null}

      <Divider my="md" />
      <Group position="right">
        <Button color="red" onClick={onClose}>
          Batal
        </Button>
        <Button
          onClick={handleSubmit(submitHandler)}
          loading={isLoadingConfirm}
        >
          Konfirmasi
        </Button>
      </Group>
    </Modal>
  );
};

export default ReturnConfirmation;
