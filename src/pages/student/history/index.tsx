import React from "react";
import Head from "next/head";
import { withAuth } from "@/common/hocs";
import { MobileLayout } from "@/common/layouts";
import { StudentHistory } from "@/borrow-return/components";
import { Box } from "@mantine/core";

const HistoryPage = () => {
  return (
    <>
      <Head>
        <title>Buku Dipinjam | SIMABU</title>
      </Head>

      <MobileLayout>
        <Box p="md">
          <StudentHistory />
        </Box>
      </MobileLayout>
    </>
  );
};

export default withAuth(HistoryPage, "Mahasiswa");
