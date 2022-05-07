import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { yellow } from "@mui/material/colors";

import { config } from "./config";

const warning = yellow;

export const theme = createTheme({
  favicon: config.theme_config.favicon_path,
  palette: {
    mode: "dark",
    primary: {
      main: config.theme_config.primary,
    },
    secondary: {
      main: config.theme_config.secondary,
    },
    warning: {
      main: warning[700],
    },
    background: {
      default: config.theme_config.bg,
      paper: config.theme_config.bg,
    },
  },
} as any);

export const Theme = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
