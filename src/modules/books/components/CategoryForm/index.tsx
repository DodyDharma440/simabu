import React, { useCallback, useEffect } from "react";
import { EditData } from "@/common/hooks";
import {
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { ICategoryInput } from "@/books/interfaces";
import {
  useCreateBookCategories,
  useUpdateBookCategories,
} from "@/books/actions";

type CategoryFormProps = {
  isOpen: boolean;
  onClose: () => void;
  editData: EditData<ICategoryInput>;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  isOpen,
  onClose,
  editData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ICategoryInput>();

  const { mutate: createCategory, isPending: isLoadingCreate } =
    useCreateBookCategories({ onSuccess: onClose });
  const { mutate: updateCategory, isPending: isLoadingUpdate } =
    useUpdateBookCategories({ onSuccess: onClose });

  const submitHandler = useCallback(
    (values: ICategoryInput) => {
      if (editData.id) {
        updateCategory({ formValues: values, id: editData.id });
      } else {
        createCategory({ formValues: values });
      }
    },
    [createCategory, editData.id, updateCategory]
  );

  useEffect(() => {
    if (isOpen) {
      reset();
      if (editData.values) {
        setValue("nama", editData.values.nama);
      }
    }
  }, [editData.values, isOpen, reset, setValue]);

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <Title order={5}>
          {`${editData.id ? "Edit" : "Tambah"} Mahasiswa`}{" "}
        </Title>
      }
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

export default CategoryForm;
