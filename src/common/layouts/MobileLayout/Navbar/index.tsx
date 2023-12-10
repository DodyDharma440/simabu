import React from "react";
import Link from "next/link";
import { ActionIcon, Box, Button, Group, Title } from "@mantine/core";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useDisclosure } from "@mantine/hooks";
import { isDark } from "@/common/utils/theme";
import { useUserContext } from "@/common/providers/UserProvider";
import Menu from "../Menu";

const Navbar = () => {
  const { isLoggedIn } = useUserContext();
  const [isOpen, { toggle }] = useDisclosure();

  return (
    <>
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
            <ActionIcon onClick={toggle} size="lg" variant="default">
              {isOpen ? <HiX /> : <HiOutlineMenu />}
            </ActionIcon>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </Group>
      </Box>
      <Menu isOpen={isOpen} onClose={close} />
    </>
  );
};

export default Navbar;
