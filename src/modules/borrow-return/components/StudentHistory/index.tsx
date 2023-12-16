import React, { useMemo } from "react";
import { useGetStudentHistory } from "@/borrow-return/actions";
import { Loader } from "@/common/components";
import { Alert, Box, Title } from "@mantine/core";
import HistoryItem from "../HistoryItem";

const StudentHistory = () => {
  const { data, isLoading, isRefetching, error } = useGetStudentHistory();

  const borrowHistory = useMemo(() => {
    return data?.data.data || [];
  }, [data?.data.data]);

  return (
    <Box>
      <Title mb="xl" order={2}>
        Riwayat Peminjaman
      </Title>
      <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
        {borrowHistory.length ? (
          <>
            {borrowHistory.map((history, index) => {
              return <HistoryItem borrow={history} key={index} />;
            })}
          </>
        ) : (
          <Alert>Belum ada riwayat peminjaman</Alert>
        )}
      </Loader>
    </Box>
  );
};

export default StudentHistory;
