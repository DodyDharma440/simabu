import { MantineThemeOverride } from "@mantine/core";

export const customTheme: MantineThemeOverride = {
  components: {
    Popover: {
      defaultProps: {
        withinPortal: true,
      },
    },
    Modal: {
      defaultProps: {
        centered: true,
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
    Input: {
      defaultProps: {
        radius: "md",
      },
    },
    Select: {
      defaultProps: {
        radius: "md",
        searchable: true,
      },
    },
    DateInput: {
      defaultProps: {
        radius: "md",
        locale: "id",
      },
    },
    YearPickerInput: {
      defaultProps: {
        radius: "md",
        locale: "id",
      },
    },
    MonthPickerInput: {
      defaultProps: {
        radius: "md",
        locale: "id",
      },
    },
    NumberInput: {
      defaultProps: {
        radius: "md",
      },
    },
    Textarea: {
      defaultProps: {
        radius: "md",
      },
    },
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: "md",
      },
    },
  },
  primaryColor: "green",
  black: "#4D4D4D",
  globalStyles: (theme) => ({
    "*": {
      fontFamily: "'Figtree', sans-serif !important",
    },
    html: {
      overflowX: "clip",
    },
    body: {
      backgroundColor:
        theme.colorScheme === "light"
          ? theme.colors.gray[0]
          : theme.colors.dark[8],
      minHeight: "100vh",
      overflowX: "clip",
    },
    a: {
      textDecoration: "none",
      color: "inherit",
    },
    button: {
      fontWeight: "500 !important" as any,
    },
    table: {
      ["& *"]: {
        fontSize: theme.fontSizes.sm,
      },
    },
  }),
  white: "#ffffff",
};
