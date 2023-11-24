import { useGetRoles, useGetStudyPrograms } from "@/auth/actions";
import { EditData } from "@/common/hooks";
import { generateOptions } from "@/common/utils/data";
import { useCreateStudent, useUpdateStudent } from "@/user/actions";
import { IStudentInput } from "@/user/interfaces";
import {
  Button,
  Divider,
  Group,
  Modal,
  PasswordInput,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

type StudentFormProps = {
  isOpen: boolean;
  onClose: () => void;
  editData: EditData<IStudentInput>;
};

const StudentForm: React.FC<StudentFormProps> = ({
  isOpen,
  onClose,
  editData,
}) => {
  const { mutate: createStudent, isPending: isLoadingCreate } =
    useCreateStudent({ onSuccess: onClose });
  const { mutate: updateStudent, isPending: isLoadingUpdate } =
    useUpdateStudent({ onSuccess: onClose });

  const { data: dataSp, refetch: refetchSps } = useGetStudyPrograms(
    {},
    { enabled: false }
  );

  const spOptions = useMemo(() => {
    return generateOptions(dataSp?.data.data || [], {
      value: "id",
      label: "nama",
    });
  }, [dataSp?.data.data]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IStudentInput>();

  const submitHandler = useCallback(
    (values: IStudentInput) => {
      if (editData.id) {
        updateStudent({ formValues: values, id: editData.id });
      } else {
        createStudent({ formValues: values });
      }
    },
    [createStudent, editData.id, updateStudent]
  );

  useEffect(() => {
    if (isOpen) {
      reset();
      refetchSps();

      if (editData.values) {
        Object.entries(editData.values).forEach(([key, value]) => {
          setValue(key as keyof IStudentInput, value);
        });
      }
    }
  }, [editData.values, isOpen, refetchSps, reset, setValue]);

  return (
    <Modal
      title={
        <Title order={5}>
          {`${editData.id ? "Edit" : "Tambah"} Mahasiswa`}{" "}
        </Title>
      }
      opened={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing="sm">
          <TextInput
            label="Nama"
            {...register("nama", {
              required: "Nama harus diisi",
            })}
            placeholder="Nama"
            error={errors.nama?.message}
          />
          <TextInput
            label="NIM"
            {...register("nim", {
              required: "NIM harus diisi",
            })}
            placeholder="NIM"
            error={errors.nim?.message}
          />
          <TextInput
            label="Alamat"
            {...register("alamat")}
            placeholder="Alamat Lengkap"
            error={errors.alamat?.message}
          />
          <TextInput
            label="No. Telepon"
            {...register("noTelp")}
            placeholder="No. Telepon"
            error={errors.noTelp?.message}
          />
          <Controller
            control={control}
            name="programStudiId"
            render={({ field }) => {
              return (
                <Select
                  label="Role"
                  {...field}
                  autoComplete="off"
                  value={`${field.value}`}
                  onChange={(val) => field.onChange(Number(val))}
                  placeholder="Pilih Program Studi"
                  data={spOptions}
                  error={errors.programStudiId?.message}
                />
              );
            }}
          />
          {!editData.id ? (
            <PasswordInput
              label="Password"
              autoComplete="new-password"
              {...register("password", {
                required: "Password harus diisi",
                minLength: {
                  value: 8,
                  message: "Password minimal 8 karakter",
                },
              })}
              placeholder="Password"
              error={errors.password?.message}
            />
          ) : null}
        </Stack>
        <Divider my="md" />
        <Group position="right">
          <Button color="gray" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" loading={isLoadingCreate || isLoadingUpdate}>
            Simpan
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default StudentForm;
