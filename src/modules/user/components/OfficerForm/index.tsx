import { useGetRoles } from "@/auth/actions";
import { EditData } from "@/common/hooks";
import { generateOptions } from "@/common/utils/data";
import { useCreateOfficer, useUpdateOfficer } from "@/user/actions";
import { IOfficerInput } from "@/user/interfaces";
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

type OfficerFormProps = {
  isOpen: boolean;
  onClose: () => void;
  editData: EditData<IOfficerInput>;
};

const OfficerForm: React.FC<OfficerFormProps> = ({
  isOpen,
  onClose,
  editData,
}) => {
  const { mutate: createOfficer, isPending: isLoadingCreate } =
    useCreateOfficer({ onSuccess: onClose });
  const { mutate: updateOfficer, isPending: isLoadingUpdate } =
    useUpdateOfficer({ onSuccess: onClose });

  const { data: dataRole, refetch: refetchRoles } = useGetRoles(
    {},
    { enabled: false }
  );
  const roleOptions = useMemo(() => {
    return generateOptions(dataRole?.data.data || [], {
      value: "id",
      label: "name",
    }).filter((opt) => opt.label !== "Mahasiswa");
  }, [dataRole?.data.data]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IOfficerInput>();

  const submitHandler = useCallback(
    (values: IOfficerInput) => {
      if (editData.id) {
        updateOfficer({ formValues: values, id: editData.id });
      } else {
        createOfficer({ formValues: values });
      }
    },
    [createOfficer, editData.id, updateOfficer]
  );

  useEffect(() => {
    if (isOpen) {
      reset();
      refetchRoles();

      if (editData.values) {
        Object.entries(editData.values).forEach(([key, value]) => {
          setValue(key as keyof IOfficerInput, value);
        });
      }
    }
  }, [editData.values, isOpen, refetchRoles, reset, setValue]);

  return (
    <Modal
      title={
        <Title order={5}>{`${editData.id ? "Edit" : "Tambah"} Petugas`} </Title>
      }
      opened={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing="sm">
          <TextInput
            label="Username"
            autoComplete="off"
            {...register("username", {
              required: "Username harus diisi",
            })}
            placeholder="Username"
            error={errors.username?.message}
          />
          {!editData.id ? (
            <PasswordInput
              autoComplete="new-password"
              label="Password"
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
          <TextInput
            label="Nama"
            {...register("nama", {
              required: "Nama harus diisi",
            })}
            placeholder="Nama"
            error={errors.nama?.message}
          />
          <TextInput
            label="NIP"
            {...register("nip", {
              required: "NIP harus diisi",
            })}
            placeholder="NIP"
            error={errors.nip?.message}
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
            name="roleId"
            render={({ field }) => {
              return (
                <Select
                  label="Role"
                  {...field}
                  value={`${field.value}`}
                  onChange={(val) => field.onChange(Number(val))}
                  placeholder="Pilih Role"
                  data={roleOptions}
                  error={errors.roleId?.message}
                />
              );
            }}
          />
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

export default OfficerForm;
