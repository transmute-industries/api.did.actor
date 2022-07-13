import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

import { AppBar, IconButton, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useRouter } from "next/router";

export const ChapiPage = ({ children }: any) => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" color={"secondary"}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/");
            }}
          >
            Credential Handler API Demo
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
