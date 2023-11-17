import { ActionIcon, Box, Checkbox } from "@mantine/core";
import {
  ColumnDef,
  ColumnHelper,
  createColumnHelper,
} from "@tanstack/react-table";
import { HiOutlineChevronRight } from "react-icons/hi";

type TableColumnsOptions = {
  withCheckbox?: boolean;
  withNumber?: boolean;
  withExpander?: boolean;
};

export const createTableColumns = <T, V = any>(
  callback: (helper: ColumnHelper<T>) => ColumnDef<T, V>[],
  options?: TableColumnsOptions
) => {
  const withNumber =
    typeof options?.withNumber !== "undefined" ? options.withNumber : true;

  const columnHelper = createColumnHelper<T>();
  const columns = callback(columnHelper);

  if (withNumber) {
    const columnNumber: ColumnDef<T, V> = {
      id: "row-number",
      header: "No.",
      cell: ({ row }) => {
        return row.index + 1;
      },
    };
    columns.splice(0, 0, columnNumber);
  }

  if (options?.withCheckbox) {
    const columnCheckbox: ColumnDef<T, V> = {
      id: "selection",
      header: ({ table }) => {
        return (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        );
      },
      cell: ({ row }) => {
        return (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        );
      },
    };
    columns.splice(0, 0, columnCheckbox);
  }

  if (options?.withExpander) {
    const columnExpander: ColumnDef<T, V> = {
      id: "row-expand",
      header: "",
      cell: ({ row }) => {
        const isExpanded = row.getIsExpanded();

        return (
          <ActionIcon
            color={isExpanded ? "primary" : "gray"}
            variant="transparent"
            onClick={row.getToggleExpandedHandler()}
          >
            <Box
              sx={{
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.2s",
              }}
            >
              <HiOutlineChevronRight />
            </Box>
          </ActionIcon>
        );
      },
    };
    columns.splice(0, 0, columnExpander);
  }

  return columns;
};
