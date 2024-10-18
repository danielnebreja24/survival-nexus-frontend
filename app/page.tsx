"use client";
import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBarComponent } from "./components/DrawerMenu/AppBar";
import { DrawerComponent } from "./components/DrawerMenu/Drawer";
import { useSurvivalContext } from "./context/survivalContext";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Survivors } from "./components/Survivors/Survivor";
import { Inventory } from "./components/Inventory/Inventory";
import { Trading } from "./components/Trading/Trading";

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
      <Box className="flex">
        <CssBaseline />
        <AppBarComponent />
        <DrawerComponent />

        <Box component="main" className="flex-grow box-border p-5">
          <DrawerHeader />
          {currentPage === "Dashboard" ? (
            <Dashboard />
          ) : currentPage === "Survivors" ? (
            <Survivors />
          ) : currentPage === "Inventory" ? (
            <Inventory />
          ) : (
            <Trading />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
