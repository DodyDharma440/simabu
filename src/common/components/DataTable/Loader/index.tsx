import React from "react";
import { AxiosError } from "axios";
import { Box, Center, Loader, Text } from "@mantine/core";
import { getErrorMessage } from "@/common/utils/react-query";
import { opacityColor } from "@/common/utils/theme";
import { IoWarningOutline, IoFileTrayOutline } from "react-icons/io5";

type DataTableLoaderProps = {
  isLoading: boolean;
  isRefetching?: boolean;
  isEmpty?: boolean;
  error?: AxiosError<any, any> | null;
  columnsLength: number;
  children: React.ReactNode;
};

const DataTableLoader: React.FC<DataTableLoaderProps> = ({
  isLoading,
  isRefetching,
  isEmpty,
  error,
  columnsLength,
  children,
}) => {
  return (
    <>
      {isRefetching && !isLoading ? (
        <>
          <Box
            component="tr"
            sx={(theme) => ({
              position: "absolute",
              backgroundColor: opacityColor(theme.colors.gray[5], 50),
              inset: 0,
              zIndex: 2,
            })}
          />
          <Box
            component="tr"
            sx={{ position: "absolute", inset: 0, zIndex: 3 }}
          >
            <Center component="td" colSpan={columnsLength} height="100%">
              <Loader />
            </Center>
          </Box>
        </>
      ) : null}
      {isLoading ? (
        <Box component="tr" h="300px">
          <Box component="td" colSpan={columnsLength}>
            <Center>
              <Loader />
            </Center>
          </Box>
        </Box>
      ) : error ? (
        <Box component="tr" h="300px">
          <Box component="td" colSpan={columnsLength}>
            <Center sx={{ flexDirection: "column" }}>
              <IoWarningOutline size={36} />
              <Text mt="xs">{getErrorMessage(error)}</Text>
            </Center>
          </Box>
        </Box>
      ) : isEmpty ? (
        <Box component="tr" h="300px">
          <Box component="td" colSpan={columnsLength}>
            <Center sx={{ flexDirection: "column" }}>
              <IoFileTrayOutline size={36} />
              <Text mt="sm">No Data</Text>
            </Center>
          </Box>
        </Box>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default DataTableLoader;
