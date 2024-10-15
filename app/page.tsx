"use client";
import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { AppBarComponent } from "./components/DrawerMenu/AppBar";
import { DrawerComponent } from "./components/DrawerMenu/Drawer";
import { useSurvivalContext } from "./context/survivalContext";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Survivors } from "./components/Survivors/Survivor";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function Home() {
  const { mode, currentPage } = useSurvivalContext();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiDialog: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === "dark" ? "#1f2937" : "#fff",
                backgroundImage: "unset",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent />
        <DrawerComponent />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {currentPage === "Dashboard" ? (
            <Dashboard />
          ) : currentPage === "Survivors" ? (
            <Survivors />
          ) : currentPage === "Items" ? (
            <Typography variant="h3">Items</Typography>
          ) : (
            <Typography variant="h3">Trading</Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
