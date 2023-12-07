import React from "react";
import Head from "next/head";
import { Content } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { UserContainer } from "@/user/components";

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

export default withAuth(UserManagement, "Admin");
