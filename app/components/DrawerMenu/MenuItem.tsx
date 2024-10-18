import { useSurvivalContext } from "@/app/context/survivalContext";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon }) => {
  const { openDrawer, setCurrentPage } = useSurvivalContext();
  return (
    <ListItem
      onClick={() => setCurrentPage(title)}
      key={title}
      disablePadding
      sx={{ display: "block" }}
    >
      <ListItemButton
        sx={[
          {
            minHeight: 48,
            px: 2.5,
          },
          openDrawer
            ? {
                justifyContent: "initial",
              }
            : {
                justifyContent: "center",
              },
        ]}
      >
        <Tooltip title={title} placement="right">
          <ListItemIcon
            sx={[
              {
                minWidth: 0,
                justifyContent: "center",
              },
              openDrawer
                ? {
                    mr: 3,
                  }
                : {
                    mr: "auto",
                  },
            ]}
          >
            {icon}
          </ListItemIcon>
        </Tooltip>
        <ListItemText
          primary={title}
          sx={[
            openDrawer
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                },
          ]}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
