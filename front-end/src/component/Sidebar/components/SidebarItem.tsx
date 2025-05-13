import { ReactNode } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
  Box,
} from "@mui/material";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  selected?: boolean;
  nested?: boolean;
  endIcon?: ReactNode;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const SidebarItem = ({
  icon,
  label,
  selected = false,
  nested = false,
  endIcon,
  onClick,
  sx,
}: SidebarItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={selected}
        onClick={onClick}
        sx={{
          borderRadius: 2,
          mb: 1,
          pl: nested ? 4 : 2,
          py: 1,
          transition: "all 0.2s ease",
          "&.Mui-selected": {
            backgroundColor: "rgba(186, 104, 200, 0.15)",
            color: "secondary.dark",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(186, 104, 200, 0.2)",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(186, 104, 200, 0.25)",
          },
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            transform: "translateX(5px)",
          },
          ...sx,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 36,
            color: selected ? "secondary.main" : "inherit",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: selected ? "medium" : "regular",
          }}
        />
        {endIcon && (
          <Box component="span" sx={{ ml: 1 }}>
            {endIcon}
          </Box>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
