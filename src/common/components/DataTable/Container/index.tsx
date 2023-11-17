import React from "react";
import { Box, Divider, BoxProps } from "@mantine/core";
import { isDark, mergeSx } from "@/common/utils/theme";
import DataTablePagination, { DataTablePaginationProps } from "../Pagination";

type DataTableContainerProps = {
  children: React.ReactNode;
  paginationProps?: DataTablePaginationProps;
} & BoxProps;

const DataTableContainer: React.FC<DataTableContainerProps> = ({
  children,
  paginationProps,
  sx,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={(theme) => ({
        border: `1px solid ${theme.colors.gray[isDark(theme) ? 7 : 4]}`,
        borderRadius: theme.radius.md,
        overflow: "hidden",
        ...mergeSx(sx, theme),
      })}
    >
      {children}
      {paginationProps ? (
        <>
          <Divider />
          <Box p="md">
            <DataTablePagination {...paginationProps} />
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default DataTableContainer;
