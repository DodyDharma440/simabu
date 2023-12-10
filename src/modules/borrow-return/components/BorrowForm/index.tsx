import React, { useCallback } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { HiOutlineExclamationCircle, HiOutlineUpload } from "react-icons/hi";
import { Controller, useFormContext } from "react-hook-form";
import { useUserProfile } from "@/auth/hooks";
import { IStudent } from "@/user/interfaces";
import { periodOptions } from "@/borrow-return/constants";
import { IBorrowInputUi } from "@/borrow-return/interfaces";
import { useBorrowBook } from "@/borrow-return/actions";
import SummaryBooks from "./SummaryBooks";

const BorrowForm = () => {
  const { replace } = useRouter();
  const { mutate: createBorrow, isPending } = useBorrowBook({
    onSuccess: () => {
      replace("/student/borrow-submission");
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<IBorrowInputUi>();

  const { userData } = useUserProfile<IStudent>();

  const submitHandler = useCallback(
    (values: IBorrowInputUi) => {
      const { books, ...formValues } = values;
      const bookIds = books.map((book) => book.id);
      formValues.bookIds = bookIds;

      createBorrow({ formValues });
    },
    [createBorrow]
  );

  return (
    <Box onSubmit={handleSubmit(submitHandler)} component="form" p="md">
      <Stack>
        <SummaryBooks />

        <Card withBorder p="md" radius="md">
          <Title order={5}>Detail peminjaman</Title>
          <Divider my="xs" />
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Nama Mahasiswa"
                readOnly
                value={userData?.nama}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="NIM" readOnly value={userData?.nim} />
            </Grid.Col>
          </Grid>

          <Stack spacing="xs" mt="sm">
            <Controller
              control={control}
              name="borrowPeriod"
              rules={{
                required: "Periode peminjaman harus dipilih",
              }}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    error={errors.borrowPeriod?.message}
                    searchable={false}
                    data={periodOptions}
                    label="Periode Peminjaman"
                    placeholder="Pilih Periode Peminjaman"
                  />
                );
              }}
            />
          </Stack>
        </Card>

        <Box>
          <Button
            h="auto"
            py="md"
            px="xs"
            fullWidth
            type="submit"
            leftIcon={<HiOutlineUpload />}
            loading={isPending}
          >
            Ajukan Peminjaman
          </Button>
          <Alert
            mt="xs"
            title="Perhatian"
            styles={{
              title: {
                marginBottom: 4,
              },
            }}
            icon={<HiOutlineExclamationCircle />}
          >
            Setelah diajukan, pengajuan peminjaman tidak dapat diubah.
          </Alert>
        </Box>
      </Stack>
    </Box>
  );
};

export default BorrowForm;
