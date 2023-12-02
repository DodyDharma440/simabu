import React from "react";
import Head from "next/head";
import { Content } from "@/common/components";
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

export default Books;
