import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Badge, Box, Center, Group, Text } from "@mantine/core";
import { ISidebarMenu } from "@/common/interfaces/ui";
import { isDark } from "@/common/utils/theme";

type SidebarItemProps = {
  item: ISidebarMenu;
  iconOnly?: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ item, iconOnly }) => {
  const router = useRouter();
  const { path, pathnames, label, icon: Icon, count } = item;
  const isActive = useMemo(() => {
    return [path, ...(pathnames || [])].includes(router.pathname);
  }, [path, pathnames, router.pathname]);

  return (
    <Link href={item.path} style={{ textDecoration: "none" }}>
      <Group
        px="xs"
        py={6}
        align="center"
        position={iconOnly ? "center" : "left"}
        sx={(theme) => ({
          borderRadius: theme.radius.md,
          backgroundColor: isActive
            ? theme.colors.orange[isDark(theme) ? 7 : 5]
            : "transparent",
          color: isActive
            ? theme.white
            : isDark(theme)
            ? theme.white
            : theme.black,
          transition: "background-color .1s",
          position: "relative",
          "&:hover": {
            backgroundColor: isActive
              ? theme.colors.orange[isDark(theme) ? 8 : 6]
              : `${theme.black}1A`,
          },
        })}
      >
        {iconOnly && count ? (
          <Box
            px={4}
            py={1}
            sx={(theme) => ({
              backgroundColor: theme.colors.red[6],
              borderRadius: "50%",
              position: "absolute",
              top: -4,
              right: -6,
            })}
          >
            <Text size={8} sx={(theme) => ({ color: theme.white })}>
              {count}
            </Text>
          </Box>
        ) : null}
        <Center sx={(theme) => ({ fontSize: theme.fontSizes.xl })}>
          {Icon ? <Icon /> : null}
        </Center>
        {!iconOnly ? (
          <>
            <Text size="lg">{label}</Text>
            {count ? (
              <Badge
                p={2}
                size="sm"
                color="red"
                radius="xs"
                variant={isActive ? "filled" : "light"}
              >
                {count}
              </Badge>
            ) : null}
          </>
        ) : null}
      </Group>
    </Link>
  );
};

export default SidebarItem;
