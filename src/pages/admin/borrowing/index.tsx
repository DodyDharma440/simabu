import React from "react";
import Head from "next/head";
import { Content } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { AdminBorrowTable } from "@/borrow-return/components";

const Books = () => {
  return (
    <>
      <Head>
        <title>Peminjaman Buku | SIMABU</title>
      </Head>

      <Content title="Peminjaman Buku">
        <AdminBorrowTable />
      </Content>
    </>
  );
};

export default withAuth(Books, ["Admin", "Petugas"]);
