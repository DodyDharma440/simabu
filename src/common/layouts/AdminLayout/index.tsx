import React from "react";
import { useRouter } from "next/router";
import { Box, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { adminMenus } from "@/common/constants/layout";
import { Sidebar } from "..";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const ignoredLayout = ["/", "/login"];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const [isSidebarOpen, { toggle: onToggleSidebar }] = useDisclosure(true);

  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const isIgnoreLayout =
    ignoredLayout.includes(router.pathname) ||
    !router.pathname.startsWith("/admin");

  return (
    <>
      {isIgnoreLayout ? (
        children
      ) : (
        <>
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={onToggleSidebar}
            menus={adminMenus}
          />
          <Box
            ml={isMobile ? 0 : isSidebarOpen ? 280 : 110}
            sx={{ transition: "margin-left .2s ease" }}
            px="md"
            pb="md"
            pt={isMobile ? 36 : "md"}
          >
            {children}
          </Box>
        </>
      )}
    </>
  );
};

export default AdminLayout;
