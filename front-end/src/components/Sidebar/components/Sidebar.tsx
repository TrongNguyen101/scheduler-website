import {
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
import PersonIcon from "@mui/icons-material/Person";
import ClassIcon from "@mui/icons-material/Class";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import UserDropdown from "./UserDropdown";
import { MenuIcon } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isUserSectionOpen, setIsUserSectionOpen] = useState(false);
  const dropdownRef = useRef(null);

  const menuItems = [
    {
      text: "Tổng quang",
      icon: <DashboardIcon />,
      onClick: () => router.push("/admin/dashboard"),
    },
    { text: "Xếp lịch học", icon: <CalendarMonthIcon /> },
    {
      text: "Quản lý giảng viên",
      icon: <PersonIcon />,
      onClick: () => router.push("/admin/teacher"),
    },
    {
      text: "Quản lý học viên",
      icon: <PersonIcon />,
      onClick: () => router.push("/admin/student"),
    },
    {
      text: "Quản lý môn học",
      icon: <MenuBookIcon />,
      onClick: () => router.push("/admin/subject"),
    },
    {
      text: "Quản lý phòng học",
      icon: <MeetingRoomIcon />,
      onClick: () => router.push("/admin/room"),
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top - Logo & Menu */}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", pb: 2, pt: 1 }}>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo trường"
              width={160}
              height={40}
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>
        </Box>
        <List sx={{ pt: 0, pb: 0 }}>
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

      {/* Bottom - User Dropdown */}
      <Box sx={{ p: 2, position: "relative" }} ref={dropdownRef}>
        <UserDropdown
          isOpen={isUserSectionOpen}
          onToggle={() => setIsUserSectionOpen(!isUserSectionOpen)}
          user={{ name: "Nguyen Van A", role: "Admin", initials: "NT" }}
        />
      </Box>
    </Box>
  );

  return (
    <Box>
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

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
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

      {!isMobile && (
        <Box
          sx={{
            width: 251,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.08), rgba(0,0,0,0))",
            height: "100vh",
          }}
        >
          {drawer}
        </Box>
      )}
    </Box>
  );
}
