import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Loader } from "@/common/components";
import MobileLayout from "@/common/layouts/MobileLayout";
import { Navbar } from "@/landing-page/components";
import { useUserProfile } from "@/auth/hooks";

const Simabu = () => {
  const { replace } = useRouter();
  const { userData } = useUserProfile();

  const isAdmin = useMemo(() => {
    return ["Admin", "Petugas"].includes(userData?.user?.role?.name || "");
  }, [userData?.user?.role?.name]);

  useEffect(() => {
    if (isAdmin) {
      replace("/admin/dashboard");
    }
  }, [isAdmin, replace]);

  return (
    <>
      <Head>
        <title>SIMABU</title>
      </Head>

      {isAdmin ? (
        <Loader isLoading screenLoader>
          <></>
        </Loader>
      ) : (
        <MobileLayout>
          <Navbar />
        </MobileLayout>
      )}
    </>
  );
};

export default Simabu;
