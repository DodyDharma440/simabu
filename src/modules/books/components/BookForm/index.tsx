import React, { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Input,
  NumberInput,
  Paper,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { generateOptions } from "@/common/utils/data";
import { opacityColor } from "@/common/utils/theme";
import {
  useCreateBook,
  useGetBookCategories,
  useUpdateBook,
} from "@/books/actions";
import { IBook, IBookInputUi } from "@/books/interfaces";
import { divideBasicData } from "@/common/utils/react-query";

type BookFormProps = {
  editId?: number;
  bookData?: IBook;
};

const BookForm: React.FC<BookFormProps> = ({ editId, bookData }) => {
  const { push } = useRouter();

  const { mutate: createBook, isPending: isLoadingCreate } = useCreateBook({
    onSuccess: () => push("/admin/books"),
  });

  const { mutate: updateBook, isPending: isLoadingUpdate } = useUpdateBook({
    onSuccess: () => push("/admin/books"),
  });

  const { data: dataCategory } = useGetBookCategories();
  const categoryOptions = useMemo(() => {
    return generateOptions(dataCategory?.data.data.nodes || [], {
      label: "nama",
      value: (val) => `${val.id}`,
    });
  }, [dataCategory?.data.data.nodes]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IBookInputUi>();

  const submitHandler = useCallback(
    (values: IBookInputUi) => {
      const { imageFile, tahunTerbitDate, ...formValues } = values;
      formValues.tahunTerbit = tahunTerbitDate?.getFullYear() || 0;

      if (editId) {
        updateBook({ formValues, id: editId });
      } else {
        createBook({ formValues });
      }
    },
    [createBook, editId, updateBook]
  );

  useEffect(() => {
    if (bookData) {
      const yearDate = new Date();
      yearDate.setFullYear(bookData.tahunTerbit);
      setValue("tahunTerbitDate", yearDate);

      const {
        divided: { kategori, imageUrl, ...divided },
      } = divideBasicData(bookData);

      Object.entries(divided).forEach(([key, value]) => {
        setValue(key as keyof IBookInputUi, value);
      });
    }
  }, [bookData, setValue]);

  return (
    <Paper p="md" radius="md">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Title order={3}>Form Buku</Title>
        <Divider my="md" />
        <Grid>
          <Grid.Col span={4}>
            <TextInput
              label="Judul Buku"
              placeholder="Judul Buku"
              error={errors.judul?.message}
              {...register("judul", {
                required: "Judul harus diisi",
              })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              label="Kode Buku"
              placeholder="Kode Buku"
              error={errors.kodeBuku?.message}
              {...register("kodeBuku", {
                required: "Kode Buku harus diisi",
              })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              label="Penulis"
              placeholder="Penulis"
              error={errors.penulis?.message}
              {...register("penulis")}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <TextInput
              label="Penerbit"
              placeholder="Penerbit"
              error={errors.penerbit?.message}
              {...register("penerbit", {
                required: "Penerbit harus diisi",
              })}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Controller
              control={control}
              name="tahunTerbitDate"
              rules={{
                required: "Tahun Terbit harus diisi",
              }}
              render={({ field }) => {
                return (
                  <YearPickerInput
                    label="Tahun Terbit"
                    placeholder="Pilih Tahun"
                    error={errors.tahunTerbitDate?.message}
                    {...field}
                  />
                );
              }}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Controller
              control={control}
              name="jumlahHalaman"
              rules={{
                required: "Jumlah Halaman harus diisi",
              }}
              render={({ field }) => {
                return (
                  <NumberInput
                    {...field}
                    min={0}
                    label="Jumlah Halaman"
                    placeholder="Jumlah Halaman"
                    error={errors.jumlahHalaman?.message}
                  />
                );
              }}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Controller
              control={control}
              name="nomorRak"
              rules={{
                required: "No. Rak harus diisi",
              }}
              render={({ field }) => {
                return (
                  <NumberInput
                    {...field}
                    min={0}
                    label="No. Rak"
                    placeholder="No. Rak"
                    error={errors.nomorRak?.message}
                  />
                );
              }}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Controller
              control={control}
              name="stok"
              rules={{
                required: "Jumlah Stok harus diisi",
              }}
              render={({ field }) => {
                return (
                  <NumberInput
                    {...field}
                    min={0}
                    label="Jumlah Stok"
                    placeholder="Jumlah Stok"
                    error={errors.stok?.message}
                  />
                );
              }}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Controller
              control={control}
              name="kategoriId"
              rules={{
                required: "Kategori harus dipilih",
              }}
              render={({ field }) => {
                return (
                  <Select
                    label="Kategori"
                    data={categoryOptions}
                    {...field}
                    value={`${field.value}`}
                    onChange={(val) => field.onChange(Number(val))}
                    placeholder="Pilih Kategori"
                    error={errors.kategoriId?.message}
                  />
                );
              }}
            />
          </Grid.Col>

          <Grid.Col span={8}>
            <Input.Wrapper label="Cover Buku" error={errors.imageFile?.message}>
              <Controller
                control={control}
                name="imageFile"
                rules={{
                  required: "Cover Buku harus diupload",
                }}
                render={({ field }) => {
                  const imageUrl = field.value
                    ? URL.createObjectURL(field.value)
                    : null;

                  return (
                    <>
                      <Box
                        my="xs"
                        w="130px"
                        h="150px"
                        sx={(theme) => ({
                          position: "relative",
                          backgroundColor: opacityColor(
                            theme.colors.gray[8],
                            10
                          ),
                        })}
                      >
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            fill
                            alt="Thumb"
                            style={{ objectFit: "contain" }}
                          />
                        ) : null}
                      </Box>
                      <input
                        type="file"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.files?.[0] || null)
                        }
                        value=""
                        id="thumb-input"
                        style={{ display: "none" }}
                      />
                      <Group>
                        <Button
                          component="label"
                          htmlFor="thumb-input"
                          size="xs"
                          color="gray"
                          sx={{ cursor: "pointer" }}
                        >
                          Upload File
                        </Button>

                        <Text size="xs">
                          {field.value ? field.value.name : ""}
                        </Text>
                      </Group>
                    </>
                  );
                }}
              />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>
        <Divider my="md" />
        <Group position="right">
          <Button
            disabled={isLoadingCreate || isLoadingUpdate}
            color="red"
            onClick={() => push("/admin/books")}
          >
            Kembali
          </Button>
          <Button type="submit" loading={isLoadingCreate || isLoadingUpdate}>
            Simpan
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default BookForm;
