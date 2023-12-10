import React from "react";
import Head from "next/head";
import { Content } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { AdminReturnTable } from "@/borrow-return/components";

const Books = () => {
  return (
    <>
      <Head>
        <title>Pengembalian Buku | SIMABU</title>
      </Head>

      <Content title="Pengembalian Buku">
        <AdminReturnTable />
      </Content>
    </>
  );
};

export default withAuth(Books, ["Admin", "Petugas"]);
