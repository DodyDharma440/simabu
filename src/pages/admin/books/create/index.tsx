import React from "react";
import Head from "next/head";
import { Content } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { BookForm } from "@/books/components";

const AddBook = () => {
  return (
    <>
      <Head>
        <title>Tambah Buku | SIMABU</title>
      </Head>

      <Content title="Tambah Buku">
        <BookForm />
      </Content>
    </>
  );
};

export default withAuth(AddBook, "Admin");
