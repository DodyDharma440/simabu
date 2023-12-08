import React from "react";
import Link from "next/link";
import { ActionIcon, Box, Button, Group, Title } from "@mantine/core";
import { isDark } from "@/common/utils/theme";
import { useUserContext } from "@/common/providers/UserProvider";
import { HiOutlineMenu } from "react-icons/hi";

const Navbar = () => {
  const { isLoggedIn } = useUserContext();

  return (
    <Box
      component="nav"
      sx={(theme) => ({
        position: "fixed",
        width: "100%",
        maxWidth: `calc(${theme.breakpoints.xs} - 2px)`,
        boxShadow: theme.shadows.md,
        backgroundColor: isDark(theme) ? theme.colors.dark[8] : theme.white,
        zIndex: 99,
      })}
      px="md"
      py="sm"
      mx="auto"
    >
      <Group position="apart">
        <Link href="/">
          <Title order={3}>Simabu</Title>
        </Link>
        {isLoggedIn ? (
          <ActionIcon size="lg" variant="default">
            <HiOutlineMenu />
          </ActionIcon>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </Group>
    </Box>
  );
};

export default Navbar;
