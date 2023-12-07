import React from "react";
import Head from "next/head";
import { Content } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { BooksContainer } from "@/books/components";

const Books = () => {
  return (
    <>
      <Head>
        <title>Management Buku | SIMABU</title>
      </Head>

      <Content title="Management Buku">
        <BooksContainer />
      </Content>
    </>
  );
};

export default withAuth(Books, "Admin");
