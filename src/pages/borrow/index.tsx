import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { Button, Center, Text } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import { MobileLayout } from "@/common/layouts";
import { withAuth } from "@/common/hocs";
import { Loader } from "@/common/components";
import { BorrowForm } from "@/borrow-return/components";
import { useGetBook } from "@/books/actions";
import { IBorrowInputUi } from "@/borrow-return/interfaces";
import { useGetIsBorrowing } from "@/borrow-return/actions";

type BorrowPageProps = {
  bookId: number;
};

const BorrowPage: NextPage<BorrowPageProps> = ({ bookId }) => {
  const {
    data: dataBorrow,
    isLoading: isLoadingBorrow,
    isRefetching: isRefetchingBorrow,
    error: errorBorrow,
  } = useGetIsBorrowing();

  const isStillBorrowing = useMemo(() => {
    return dataBorrow?.data.data || false;
  }, [dataBorrow?.data.data]);

  const { data, isLoading, isRefetching, error } = useGetBook({ id: bookId });
  const formMethods = useForm<IBorrowInputUi>({
    defaultValues: {
      books: [],
      bookIds: [],
    },
  });
  const { setValue } = formMethods;

  const book = useMemo(() => {
    return data?.data.data;
  }, [data?.data.data]);

  useEffect(() => {
    if (book) {
      setValue("books", [book]);
    }
  }, [book, setValue]);

  return (
    <MobileLayout>
      <Loader
        isLoading={isLoading || isLoadingBorrow}
        isRefetching={isRefetching || isRefetchingBorrow}
        error={error || errorBorrow}
      >
        {isStillBorrowing ? (
          <Center h="200px">
            <Text align="center">
              Saat ini masih ada peminjaman buku yang belum selesai.
            </Text>
          </Center>
        ) : (
          <FormProvider {...formMethods}>
            {book && book.stok < 1 ? (
              <Center sx={{ flexDirection: "column" }} h="100px">
                <Text align="center" mb="xs">
                  Stok buku sudah tidak tersedia.
                </Text>
                <Link href="/">
                  <Button variant="light">Kembali</Button>
                </Link>
              </Center>
            ) : (
              <BorrowForm />
            )}
          </FormProvider>
        )}
      </Loader>
    </MobileLayout>
  );
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
