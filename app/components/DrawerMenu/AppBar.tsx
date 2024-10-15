import { IconButton, Toolbar, Typography } from "@mui/material";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useSurvivalContext } from "@/app/context/survivalContext";
import { styled } from "@mui/material/styles";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const AppBarComponent: React.FC<AppBarProps> = () => {
  const { openDrawer, mode, setMode, setOpenDrawer } = useSurvivalContext();

  return (
    <AppBar position="fixed" open={openDrawer}>
      <Toolbar>
        <div className="inline-flex items-center justify-between w-full">
          <div className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpenDrawer(!openDrawer)}
              edge="start"
              sx={[
                {
                  mr: 2,
                },
                openDrawer && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className="flex items-center ml-2"
              variant="h6"
              noWrap
              component="div"
            >
              <Image
                src="/images/zombie-hand-white.png"
                alt="Survival logo"
                width={23}
                height={23}
                className="mr-1"
              />
              <span className="logo-title">Survival Nexus</span>
            </Typography>
          </div>
          <DarkModeSwitch
            checked={mode === "dark"}
            onChange={() => setMode(mode === "dark" ? "light" : "dark")}
            size={25}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};
