import React from "react";
import { Stack } from "@mantine/core";
import { isDark } from "@/common/utils/theme";
import { useTransitionElement } from "@/common/hooks";
import Content from "./Content";
import { ISidebarMenu } from "@/common/interfaces/ui";

type SidebarProps = {
  isOpen: boolean;
  menus: ISidebarMenu[];
  onToggle: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, menus }) => {
  const [isOpenTransition, onClose] = useTransitionElement({
    onClose: onToggle,
    closeDuration: 200,
    openDuration: 500,
    initialIsOpen: true,
  });

  return (
    <Stack
      px={isOpen ? "xl" : "sm"}
      py="lg"
      sx={(theme) => ({
        width: isOpen ? 280 : 80,
        position: "fixed",
        top: isOpen ? 0 : 30,
        bottom: isOpen ? 0 : 30,
        left: isOpen ? 0 : 30,
        backgroundColor: isDark(theme) ? theme.colors.gray[9] : theme.white,
        border: `${isOpen ? 0 : 1}px solid ${
          theme.colors.gray[isDark(theme) ? 7 : 3]
        }`,
        borderRadius: isOpen ? 0 : theme.radius.md,
        borderRight: `1px solid ${theme.colors.gray[isDark(theme) ? 7 : 3]}`,
        transition: "all .2s ease",
        zIndex: 1,
      })}
    >
      <Content
        menus={menus}
        isSidebarOpen={isOpen}
        onClose={onClose}
        isOpenTransition={isOpenTransition}
      />
    </Stack>
  );
};

export default Sidebar;
