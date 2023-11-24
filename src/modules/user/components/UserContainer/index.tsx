import { Box, Tabs } from "@mantine/core";
import React from "react";
import OfficerTable from "../OfficerTable";
import StudentTable from "../StudentTable";

const UserContainer = () => {
  return (
    <Tabs
      radius="md"
      variant="outline"
      defaultValue="officer"
      styles={(theme) => ({
        tab: {
          padding: `${theme.spacing.md} ${theme.spacing.lg}`,
        },
        tabLabel: {
          fontSize: theme.fontSizes.md,
        },
      })}
    >
      <Tabs.List>
        <Tabs.Tab value="officer">Petugas</Tabs.Tab>
        <Tabs.Tab value="student">Mahasiswa</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="officer" pt="xs">
        <Box px="md">
          <OfficerTable />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="student" pt="xs">
        <Box px="md">
          <StudentTable />
        </Box>
      </Tabs.Panel>
    </Tabs>
  );
};

export default UserContainer;
