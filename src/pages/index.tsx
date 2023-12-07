import React from "react";
import Head from "next/head";
import { Button } from "@mantine/core";
import Link from "next/link";
import MobileLayout from "@/common/layouts/MobileLayout";

const Simabu = () => {
  return (
    <>
      <Head>
        <title>SIMABU</title>
      </Head>

      <MobileLayout>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </MobileLayout>
    </>
  );
};

export default Simabu;
