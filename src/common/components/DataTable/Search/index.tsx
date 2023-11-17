import React from "react";
import { TextInput, TextInputProps, useMantineTheme } from "@mantine/core";
import { IoSearchOutline } from "react-icons/io5";
import { isDark, mergeSx } from "@/common/utils/theme";

type DataTableSearchProps = {} & TextInputProps;

const DataTableSearch = React.forwardRef<
  HTMLInputElement,
  DataTableSearchProps
>(({ sx, styles, ...props }, ref) => {
  const theme = useMantineTheme();
  return (
    <TextInput
      ref={ref}
      icon={
        <IoSearchOutline color={isDark(theme) ? theme.white : theme.black} />
      }
      placeholder="Cari..."
      sx={(theme) => ({
        width: "100%",
        maxWidth: 250,
        [theme.fn.smallerThan("xs")]: {
          maxWidth: "100%",
        },
        ...mergeSx(sx, theme),
      })}
      data-styles="default"
      id="datatable-search"
      {...props}
    />
  );
});

DataTableSearch.displayName = "DataTableSearch";

export default DataTableSearch;
