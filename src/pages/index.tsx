import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Footer, Text } from "@mantine/core";
import { Loader } from "@/common/components";
import { MobileLayout } from "@/common/layouts";
import { BookLists, HeroSection, Navbar } from "@/landing-page/components";
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
          <Box pt="60px">
            <HeroSection />
            <BookLists />
            <Footer
              height={60}
              display="flex"
              sx={{
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Text size="xs" color="dimmed" align="center">
                Simabu &copy; 2023. Kelompok 2 - IF Malam
              </Text>
            </Footer>
          </Box>
        </MobileLayout>
      )}
    </>
  );
};

export default Simabu;
