import React from "react";
import Head from "next/head";
import { Content, Loader } from "@/common/components";
import { BookForm } from "@/books/components";
import { GetServerSideProps, NextPage } from "next";
import { useGetBook } from "@/books/actions";

type EditBookProps = {
  bookId: number;
};

const EditBook: NextPage<EditBookProps> = ({ bookId }) => {
  const { data, isLoading, isRefetching, error } = useGetBook({ id: bookId });

  return (
    <>
      <Head>
        <title>Edit Buku | SIMABU</title>
      </Head>

      <Content title="Edit Buku">
        <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
          <BookForm editId={bookId} bookData={data?.data.data} />
        </Loader>
      </Content>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      bookId: Number(params?.["id"]),
    },
  };
};

export default EditBook;
