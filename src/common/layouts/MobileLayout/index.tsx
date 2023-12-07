import React from "react";
import { Box } from "@mantine/core";
import { isDark } from "@/common/utils/theme";

type MobileLayoutProps = {
  children: React.ReactNode;
};

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <Box
      component="main"
      sx={(theme) => ({
        width: theme.breakpoints.xs,
        borderLeft: "1px solid",
        borderRight: "1px solid",
        borderColor: theme.colors.gray[isDark(theme) ? 8 : 3],
        minHeight: "100vh",
      })}
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default MobileLayout;
