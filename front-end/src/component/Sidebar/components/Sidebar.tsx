import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import ClassIcon from "@mui/icons-material/Class";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";

export default function Sidebar() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const menuItems = [
    { text: "Tổng quang", icon: <DashboardIcon /> },
    { text: "Xếp lịch học", icon: <CalendarMonthIcon /> },
    { text: "Quản lý học viên", icon: <SchoolIcon /> },
    {
      text: "Quản lý giảng viên",
      icon: <PersonIcon />,
      onClick: () => console.log("Show Teacher View"),
    },
    {
      text: "Quản lý Con Người",
      icon: <PersonIcon />,
      onClick: () => console.log("Show Person View"),
    },
    {
      text: "Quản lý môn học",
      icon: <MenuBookIcon />,
      onClick: () => console.log("Show Course View"),
    },
    {
      text: "Quản lý phòng học",
      icon: <MeetingRoomIcon />,
      onClick: () => console.log("Show Room View"),
    },
    { text: "Quản Lí Lớp Học", icon: <ClassIcon /> },
    { text: "Cài đặt", icon: <SettingsIcon /> },
  ];

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    if (menuItems[index].onClick) {
      menuItems[index].onClick();
    }
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#F0F4F8",
        height: "100%",
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              sx={{
                "&.Mui-selected": {
                  borderRadius: "5px",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && !mobileOpen && (
        <Box position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Box>
      )}

      {/* Drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        sx={{
          width: 250,
          backgroundColor: "#F0F4F8",
          borderRight: "1px solid #F0F4F8",
        }}
      >
        <Box
          sx={{
            
            flexDirection: "column",
            height: "100vh",
            display: { xs: "none", sm: "block" },
          }}
        >
          {drawer}
          {/* <List sx={{ pt: 0 }}>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={() => handleListItemClick(index)}
                  sx={{
                    "&.Mui-selected": {
                      borderRadius: "5px",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Box>
      </Box>
    </>
  );
}
