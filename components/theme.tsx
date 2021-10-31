import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { indigo, purple, yellow, blueGrey, grey } from "@mui/material/colors";

const primary = purple;
const secondary = indigo;
const warning = yellow;
const background = grey;

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: primary[50],
      main: primary["A100"],
    },
    secondary: {
      light: secondary[50],
      main: secondary["A100"],
    },
    warning: {
      main: warning[700],
    },
    background: {
      default: background[800],
      paper: background[800],
    },
  },
});

export const Theme = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
