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
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IoMenuOutline } from "react-icons/io5";
import { isDark } from "@/common/utils/theme";
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
  // const { userData } = useUserProfile();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useHotkeys([["mod+B", () => onClose()]]);

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
              <Box sx={{ flex: 1 }}>
                <Text size={24} weight="600" sx={{ lineHeight: 1.3 }}>
                  SIMABU
                </Text>
              </Box>
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
          {menus.map((menu, index) => {
            return (
              <SidebarItem iconOnly={!isSidebarOpen} item={menu} key={index} />
            );
          })}
        </Stack>
      </ScrollArea>
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
