import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@mantine/core";
import { withAuth } from "@/common/hocs";
import { MobileLayout } from "@/common/layouts";

const HistoryPage = () => {
  return (
    <>
      <Head>
        <title>Buku Dipinjam | SIMABU</title>
      </Head>

      <MobileLayout>
        <Link href="/logout">
          <Button>Logout</Button>
        </Link>
      </MobileLayout>
    </>
  );
};

export default withAuth(HistoryPage, "Mahasiswa");
