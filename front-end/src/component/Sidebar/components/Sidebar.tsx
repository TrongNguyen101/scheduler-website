import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

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

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#F0F4F8",
        borderRight: "1px solid #F0F4F8",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <List sx={{ pt: 0 }}>
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
    </Box>
  );
}
