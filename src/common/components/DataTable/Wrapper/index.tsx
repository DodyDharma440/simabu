import React, { forwardRef } from "react";
import { Group, GroupProps } from "@mantine/core";
import { mergeSx } from "@/common/utils/theme";

type DataTableWrapperProps = {
  content: "add-button" | "search-perpage";
  children: React.ReactNode;
} & Omit<GroupProps, "children">;

const DataTableWrapper = forwardRef<HTMLDivElement, DataTableWrapperProps>(
  ({ content, children, sx, ...props }, ref) => {
    return (
      <Group
        ref={ref}
        mb={content === "search-perpage" ? "md" : 0}
        {...props}
        sx={(theme) => ({
          justifyContent: "space-between",
          [theme.fn.smallerThan("xs")]: {
            justifyContent: "center",
            flexDirection: "column",
          },
          ...(content === "add-button"
            ? {
                ["& a, a > button"]: {
                  width: "100%",
                  [theme.fn.largerThan("xs")]: {
                    width: "auto",
                  },
                },
              }
            : {}),
          ...mergeSx(sx, theme),
        })}
      >
        {children}
      </Group>
    );
  }
);

DataTableWrapper.displayName = "DataTableWrapper";

export default DataTableWrapper;
