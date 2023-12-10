import React from "react";
import { Box, Footer, Text } from "@mantine/core";
import { isDark } from "@/common/utils/theme";
import Navbar from "./Navbar";

type MobileLayoutProps = {
  children: React.ReactNode;
};

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <Box
      component="main"
      sx={(theme) => ({
        width: "100%",
        maxWidth: theme.breakpoints.xs,
        borderLeft: "1px solid",
        borderRight: "1px solid",
        borderColor: theme.colors.gray[isDark(theme) ? 8 : 3],
        minHeight: "100vh",
      })}
      mx="auto"
    >
      <Navbar />
      <Box
        pt="60px"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ flex: 1 }}>{children}</Box>
        <Footer
          height={60}
          display="flex"
          sx={{
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <Text size="xs" color="dimmed" align="center">
            Simabu &copy; 2023. Kelompok 2 - IF Malam
          </Text>
        </Footer>
      </Box>
    </Box>
  );
};

export default MobileLayout;
