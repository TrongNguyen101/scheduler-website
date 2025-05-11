import { ReactNode } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  SxProps,
  Theme,
} from "@mui/material";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  count?: number;
  selected?: boolean;
  sx?: SxProps<Theme>;
}

const SidebarItem = ({
  icon,
  label,
  count,
  selected = false,
  sx,
}: SidebarItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={selected}
        sx={{
          borderRadius: 1.5,
          mb: 0.5,
          "&.Mui-selected": {
            backgroundColor: "rgba(186, 104, 200, 0.08)",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(186, 104, 200, 0.12)",
          },
          ...sx,
        }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>
          {count !== undefined ? (
            <Badge badgeContent={count} color="primary">
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
