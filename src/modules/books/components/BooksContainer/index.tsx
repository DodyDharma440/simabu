import React from "react";
import { Tabs, Box } from "@mantine/core";
import CategoriesTable from "../CategoriesTable";
import BooksTable from "../BooksTable";

const BooksContainer = () => {
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
        <Tabs.Tab value="officer">Buku</Tabs.Tab>
        <Tabs.Tab value="student">Kategori</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="officer" pt="xs">
        <Box px="md">
          <BooksTable />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="student" pt="xs">
        <Box px="md">
          <CategoriesTable />
        </Box>
      </Tabs.Panel>
    </Tabs>
  );
};

export default BooksContainer;
