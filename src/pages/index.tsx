import React from "react";
import Head from "next/head";
import { Button } from "@mantine/core";
import Link from "next/link";

const Simabu = () => {
  return (
    <>
      <Head>
        <title>SIMABU</title>
      </Head>

      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </>
  );
};

export default Simabu;
