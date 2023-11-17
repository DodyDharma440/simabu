import React from "react";
import { Group, Button, Text, Box } from "@mantine/core";

export type DataTablePaginationProps = {
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
};

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  perPage,
  total,
  totalPages,
  onNext,
  onPrev,
  hasPrevPage,
  hasNextPage,
}) => {
  return (
    <Group
      sx={(theme) => ({
        justifyContent: "space-between",
        [theme.fn.smallerThan("sm")]: {
          justifyContent: "center",
          flexDirection: "column",
        },
      })}
    >
      <Box>
        <Text size="sm" color="dimmed">
          Menampilkan {perPage > total ? total : perPage} dari {total}
        </Text>
      </Box>
      <Group>
        <Button
          disabled={!hasPrevPage}
          size="sm"
          onClick={onPrev}
          variant="default"
          compact
        >
          Previous
        </Button>
        <Text size="sm" color="dimmed">
          Page {currentPage} of {totalPages || 1}
        </Text>
        <Button
          disabled={!hasNextPage}
          size="sm"
          onClick={onNext}
          variant="default"
          compact
        >
          Next
        </Button>
      </Group>
    </Group>
  );
};

export default DataTablePagination;
