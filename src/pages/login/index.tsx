import React from "react";
import Head from "next/head";
import { AuthContainer } from "@/modules/auth/components";
import { GetServerSideProps } from "next";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <AuthContainer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = req.cookies[process.env["COOKIE_NAME"]!];

  if (token) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
