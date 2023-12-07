import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Cookies from "cookies";
import dayjs from "dayjs";
import { Loader } from "@/common/components";

const LogoutPage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/login");
    localStorage.removeItem("isLoggedIn");
  }, [replace]);

  return (
    <Loader isLoading placeholderHeight="100vh">
      <></>
    </Loader>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);

  cookies.set(process.env["COOKIE_NAME"]!, "", {
    httpOnly: true,
    expires: dayjs().add(-1, "day").toDate(),
    path: "/",
  });

  return {
    props: {},
  };
};

export default LogoutPage;
