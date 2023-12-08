import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { MobileLayout } from "@/common/layouts";
import { withAuth } from "@/common/hocs";

type BorrowPageProps = {
  bookId: number;
};

const BorrowPage: NextPage<BorrowPageProps> = ({ bookId }) => {
  return <MobileLayout>Borrow</MobileLayout>;
};

export const getServerSideProps: GetServerSideProps<BorrowPageProps> = async ({
  query,
}) => {
  const bookId = Number(query["book_id"] || "0") || null;

  if (!bookId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      bookId,
    },
  };
};

export default withAuth(BorrowPage, ["Mahasiswa"]);
