import React, { useMemo } from "react";
import {
  useDataTableLifecycle,
  useModalForm,
  useServerDataTable,
} from "@/common/hooks";
import { useGetOfficers } from "@/user/actions";
import { officerCols } from "@/user/constants";
import { Box, Button, Group } from "@mantine/core";
import { DataTable } from "@/common/components";
import OfficerForm from "../OfficerForm";
import { IOfficerInput } from "@/user/interfaces";

const OfficerTable = () => {
  const { paginationProps, perPageProps, tableLifecycleProps, tableParams } =
    useServerDataTable();
  const { data, isLoading, isRefetching, error, refetch } = useGetOfficers({
    urlParams: `?${tableParams}`,
  });

  const { isFormOpen, onOpenForm, onCloseForm, editData } =
    useModalForm<IOfficerInput>();

  const officers = useMemo(() => {
    return data?.data.data.nodes || [];
  }, [data?.data.data]);

  const columns = useMemo(() => {
    return officerCols();
  }, []);

  useDataTableLifecycle({
    refetcher: refetch,
    total: data?.data.data.totalCount,
    ...tableLifecycleProps,
  });

  return (
    <Box py="md">
      <Group position="right">
        <Button onClick={onOpenForm}>Tambah Petugas</Button>
      </Group>

      <DataTable.Wrapper content="search-perpage">
        <DataTable.PerPage {...perPageProps} />
      </DataTable.Wrapper>

      <DataTable.Container paginationProps={paginationProps}>
        <DataTable
          data={officers}
          columns={columns}
          isLoading={isLoading}
          isRefetching={isRefetching}
          error={error}
        />
      </DataTable.Container>

      <OfficerForm
        isOpen={isFormOpen}
        onClose={onCloseForm}
        editData={editData}
      />
    </Box>
  );
};

export default OfficerTable;
