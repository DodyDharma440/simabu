import React from "react";
import Head from "next/head";
import { UserContainer } from "@/user/components";
import { Content } from "@/common/components";

const UserManagement = () => {
  return (
    <>
      <Head>
        <title>User Management | SIMABU</title>
      </Head>

      <Content title="User Management">
        <UserContainer />
      </Content>
    </>
  );
};

export default UserManagement;
