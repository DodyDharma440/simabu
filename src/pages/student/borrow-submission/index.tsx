import React from "react";
import Head from "next/head";
import { Box } from "@mantine/core";
import { withAuth } from "@/common/hocs";
import { MobileLayout } from "@/common/layouts";
import { StudentSubmission } from "@/borrow-return/components";

const BorrowedBooksPage = () => {
  return (
    <>
      <Head>
        <title>Buku Dipinjam | SIMABU</title>
      </Head>

      <MobileLayout>
        <Box p="md">
          <StudentSubmission />
        </Box>
      </MobileLayout>
    </>
  );
};

export default withAuth(BorrowedBooksPage, ["Mahasiswa"]);
