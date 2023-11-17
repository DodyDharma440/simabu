import React from "react";
import { GetServerSideProps } from "next";
import Cookies from "cookies";
import dayjs from "dayjs";

const LogoutPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);

  cookies.set(process.env["COOKIE_NAME"]!, "", {
    httpOnly: true,
    expires: dayjs().add(-1, "day").toDate(),
    path: "/",
  });

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

export default LogoutPage;
