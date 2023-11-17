import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@mantine/core";

const AdminDashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard | SIMABU</title>
      </Head>

      <Link href="/logout">
        <Button>Logout</Button>
      </Link>
    </>
  );
};

export default AdminDashboardPage;
