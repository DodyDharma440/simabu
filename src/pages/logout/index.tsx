import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Cookies from "cookies";
import dayjs from "dayjs";
import { Loader } from "@/common/components";

const LogoutPage = () => {
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    setIsRemoved(true);
  }, []);

  useEffect(() => {
    if (isRemoved) {
      window.location.replace("/login");
    }
  }, [isRemoved]);

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
