import { useDisclosure } from "@mantine/hooks";
import { useState, useCallback } from "react";
import { IFormModalProps } from "../../interfaces/ui";

export type EditData<T, I = string> = {
  values: T | null;
  id: I | null;
};

export const useModalForm = <T extends any = any, I = string>(
  defaultOpen?: boolean
) => {
  const [
    isFormOpen,
    { open: onOpenForm, close: onCloseForm, toggle: onToggleForm },
  ] = useDisclosure(defaultOpen);

  const [editData, setEditData] = useState<EditData<T, I>>({
    values: null,
    id: null,
  });

  const handleAdd = useCallback(() => {
    setEditData({
      values: null,
      id: null,
    });
    onOpenForm();
  }, [onOpenForm]);

  const handleEdit = useCallback(
    (values: T, id: I) => {
      setEditData({
        values,
        id,
      });
      onOpenForm();
    },
    [onOpenForm]
  );

  return {
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onToggleForm,
    editData,
    onAdd: handleAdd,
    onEdit: handleEdit,
    formModalProps: {
      isOpen: isFormOpen,
      onClose: onCloseForm,
      editData,
    } as IFormModalProps<T, I>,
  };
};
