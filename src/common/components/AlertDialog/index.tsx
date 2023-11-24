import React from "react";
import {
  Button,
  ButtonProps,
  Group,
  Highlight,
  Modal,
  ModalProps,
  Text,
} from "@mantine/core";

type AlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  color?: string;
  title?: React.ReactNode;
  message?: string;
  highlightedMessage?: string[];
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonProps?: Omit<ButtonProps, "children">;
  cancelButtonProps?: Omit<ButtonProps, "children">;
  modalProps?: Omit<ModalProps, "opened" | "onClose">;
};

const AlertDialog: React.FC<AlertDialogProps> = ({
  onClose,
  isOpen,
  isLoading,
  color,
  title,
  message,
  highlightedMessage,
  onConfirm,
  onCancel,
  confirmButtonProps,
  cancelButtonProps,
  confirmButtonText,
  cancelButtonText,
  modalProps,
}) => {
  const colorIndex = 7;

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        if (!isLoading) onClose();
      }}
      styles={(theme) => ({
        header: {
          paddingBottom: theme.spacing.sm,
        },
        content: {
          padding: `${theme.spacing.xs} ${theme.spacing.sm} !important`,
        },
      })}
      title={
        <Text
          weight="600"
          sx={(theme) => ({
            fontSize: theme.fontSizes.xl,
            [theme.fn.smallerThan("sm")]: {
              fontSize: theme.fontSizes.lg,
            },
          })}
        >
          {title}
        </Text>
      }
      size="sm"
      {...modalProps}
    >
      {message ? (
        <Highlight
          py={{ base: 0, lg: "xs" }}
          color="dimmed"
          highlight={highlightedMessage || []}
          highlightStyles={(theme) => ({
            background: "transparent",
            color: theme.colors[color || theme.primaryColor][colorIndex],
            fontWeight: 600,
          })}
          sx={(theme) => ({
            [theme.fn.smallerThan("md")]: {
              fontSize: theme.fontSizes.sm,
            },
          })}
        >
          {message}
        </Highlight>
      ) : null}

      <Group
        noWrap
        position="right"
        mt="md"
        spacing="sm"
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            flexDirection: "column-reverse",
            ["& button"]: {
              width: "100%",
            },
          },
        })}
      >
        <Button
          compact={false}
          size="sm"
          variant="default"
          disabled={isLoading}
          {...cancelButtonProps}
          onClick={onCancel || onClose}
        >
          {cancelButtonText || "Batal"}
        </Button>
        <Button
          compact={false}
          size="sm"
          color={color}
          loading={isLoading}
          {...confirmButtonProps}
          onClick={onConfirm}
        >
          {confirmButtonText || "Konfirmasi"}
        </Button>
      </Group>
    </Modal>
  );
};

export default AlertDialog;
