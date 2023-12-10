import { studentMenu } from "@/common/constants/layout";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Group,
  Switch,
  Text,
  Transition,
  useMantineColorScheme,
} from "@mantine/core";
import { isDark } from "@/common/utils/theme";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const { pathname } = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Transition
      mounted={isOpen}
      transition="fade"
      duration={200}
      timingFunction="ease"
    >
      {(styles) => (
        <Box
          style={styles}
          p="md"
          sx={(theme) => ({
            zIndex: 100,
            position: "fixed",
            top: "58px",
            width: "100%",
            maxWidth: `calc(${theme.breakpoints.xs} - 2px)`,
            background: isDark(theme) ? theme.colors.dark[7] : theme.white,
            borderBottomLeftRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
            boxShadow: theme.shadows.md,
          })}
        >
          <Group position="apart" mb="md">
            <Text weight="bold" size="sm">
              Menu
            </Text>
            <Switch
              label="Dark Mode"
              checked={colorScheme === "dark"}
              onChange={() => toggleColorScheme()}
            />
          </Group>
          <Divider mb="md" />
          {studentMenu.map((menu, index) => {
            const isActive = menu.path === pathname;

            return (
              <Link href={menu.path} key={index} onClick={onClose}>
                <Text
                  mb="md"
                  weight={isActive ? "bold" : "normal"}
                  color={isActive ? "orange" : undefined}
                >
                  {menu.label}
                </Text>
              </Link>
            );
          })}
        </Box>
      )}
    </Transition>
  );
};

export default Menu;
