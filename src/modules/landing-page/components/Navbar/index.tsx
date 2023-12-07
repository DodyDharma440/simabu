import React from "react";
import Link from "next/link";
import { Box, Button, Group, Title } from "@mantine/core";
import { isDark } from "@/common/utils/theme";

const Navbar = () => {
  return (
    <Box
      component="nav"
      sx={(theme) => ({
        position: "fixed",
        width: `calc(${theme.breakpoints.xs} - 2px)`,
        boxShadow: theme.shadows.md,
        backgroundColor: isDark(theme) ? theme.colors.dark[8] : theme.white,
        zIndex: 99,
      })}
      px="md"
      py="sm"
      mx="auto"
    >
      <Group position="apart">
        <Title order={3}>Simabu</Title>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </Group>
    </Box>
  );
};

export default Navbar;
