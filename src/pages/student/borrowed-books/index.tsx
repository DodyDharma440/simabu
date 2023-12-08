import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@mantine/core";
import { withAuth } from "@/common/hocs";

const BorrowedBooksPage = () => {
  return (
    <>
      <Head>
        <title>Buku Dipinjam | SIMABU</title>
      </Head>

      <Link href="/logout">
        <Button>Logout</Button>
      </Link>
    </>
  );
};

export default withAuth(BorrowedBooksPage, ["Mahasiswa"]);
