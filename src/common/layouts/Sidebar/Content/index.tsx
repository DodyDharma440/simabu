import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Group,
  Center,
  UnstyledButton,
  Stack,
  Divider,
  Avatar,
  Text,
  Flex,
  ScrollArea,
  Switch,
  useMantineColorScheme,
  Card,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IoMenuOutline } from "react-icons/io5";
import { useUserProfile } from "@/auth/hooks";
import { ISidebarMenu } from "@/common/interfaces/ui";
import SidebarItem from "../Item";

export type ContentProps = {
  onClose: () => void;
  isSidebarOpen: boolean;
  isOpenTransition: boolean;
  menus: ISidebarMenu[];
};

const Content: React.FC<ContentProps> = ({
  onClose,
  isSidebarOpen,
  isOpenTransition,
  menus,
}) => {
  const { userData } = useUserProfile();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useHotkeys([["mod+B", () => onClose()]]);

  const protectedMenus = useMemo(() => {
    return menus.filter((menu) => {
      return menu.roles?.includes(userData?.user?.role?.name || "") || false;
    });
  }, [menus, userData?.user?.role?.name]);

  return (
    <Stack
      sx={{
        opacity: isOpenTransition ? 1 : 0,
        transition: "opacity .1s",
        height: "100%",
      }}
    >
      <Box my="md">
        <Flex
          direction={isSidebarOpen ? "row" : "column"}
          align="center"
          gap="xs"
        >
          <Link
            href="/"
            style={{ flex: 1, color: "inherit", textDecoration: "none" }}
          >
            {isSidebarOpen ? (
              <Group spacing="xs" sx={{ flex: 1 }}>
                <Box sx={{ position: "relative", width: 40, height: 40 }}>
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src="/images/png/logo.png"
                    alt="Logo"
                  />
                </Box>
                <Text size={24} weight="600" sx={{ lineHeight: 1.3 }}>
                  SIMABU
                </Text>
              </Group>
            ) : null}
          </Link>
          <UnstyledButton onClick={onClose}>
            <Center>
              <IoMenuOutline size={24} />
            </Center>
          </UnstyledButton>
        </Flex>
      </Box>

      <ScrollArea
        mx={-16}
        my="md"
        px="md"
        styles={{ viewport: { padding: 0 } }}
        offsetScrollbars
        sx={{ flex: 1 }}
      >
        <Stack align={isSidebarOpen ? "left" : "center"} spacing="md">
          {protectedMenus.map((menu, index) => {
            return (
              <SidebarItem iconOnly={!isSidebarOpen} item={menu} key={index} />
            );
          })}
        </Stack>
      </ScrollArea>
      <Card
        withBorder
        radius="md"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Avatar mr="md" color="primary" radius="xl" />
        <Box>
          <Text>{userData?.nama}</Text>
          <Text size="xs" color="dimmed">
            {userData?.user?.role?.name}
          </Text>
        </Box>
      </Card>
      <Switch
        mx={isSidebarOpen ? 0 : "xs"}
        label={isSidebarOpen ? "Dark Mode" : ""}
        checked={colorScheme === "dark"}
        onChange={() => toggleColorScheme()}
      />
    </Stack>
  );
};

export default Content;
