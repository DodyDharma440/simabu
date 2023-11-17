import React from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { customTheme } from "../../configs/theme";

type ThemeProviderProps = {
  children: React.ReactNode;
  colorKey: string;
  theme?: MantineThemeOverride;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  colorKey,
  theme,
}) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: `${colorKey}-color-scheme`,
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...(theme || customTheme), colorScheme }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ThemeProvider;
