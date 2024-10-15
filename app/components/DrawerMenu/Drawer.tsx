// app/components/Drawer.tsx
import { Divider, List, IconButton, Drawer as MuiDrawer } from "@mui/material";
import {
  DashboardOutlined,
  Diversity3Outlined,
  HandshakeOutlined,
  MedicationLiquidOutlined,
  WidgetsOutlined,
} from "@mui/icons-material";
import { createTheme, CSSObject, styled, Theme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSurvivalContext } from "@/app/context/survivalContext";
import { useMemo } from "react";
import MenuItem from "./MenuItem";

interface MenuItemsProps {
  title: string;
  icon: React.ReactNode;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export const DrawerComponent: React.FC = () => {
  const { openDrawer, mode, setOpenDrawer } = useSurvivalContext();

  const menuItems: MenuItemsProps[] = [
    {
      title: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      title: "Survivors",
      icon: <Diversity3Outlined />,
    },
    {
      title: "Items",
      icon: <MedicationLiquidOutlined />,
    },
    {
      title: "Trading",
      icon: <HandshakeOutlined />,
    },
  ];

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
    <Drawer variant="permanent" open={openDrawer}>
      <DrawerHeader>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((text) => (
          <MenuItem title={text.title} icon={text.icon} />
        ))}
      </List>
    </Drawer>
  );
};
