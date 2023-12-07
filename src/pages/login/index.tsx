import React from "react";
import Head from "next/head";
import { AuthContainer } from "@/auth/components";
import { GetServerSideProps, NextApiRequest } from "next";
import { decodeToken } from "@/common/utils/auth";

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
  const decodedToken = decodeToken(req as NextApiRequest);

  const role = decodedToken?.role?.name;

  if (token) {
    return {
      redirect: {
        destination:
          role === "Mahasiswa" ? "/student/dashboard" : "/admin/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
