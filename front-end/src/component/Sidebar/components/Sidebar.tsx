import { Box, List, Divider, Collapse } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import ClassIcon from "@mui/icons-material/Class";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [openManagement, setOpenManagement] = useState(true);

  const handleManagementClick = () => {
    setOpenManagement(!openManagement);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f8f9fa",
        borderRight: "1px solid",
        borderColor: "divider",
        width: 240,
        transition: "width 0.3s ease",
        "&:hover": {
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Logo and App Title */}
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          mb: 1,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 40,
            height: 40,
            mr: 2,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          S
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #ba68c8, #7b1fa2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          EduScheduler
        </Typography>
      </Box> */}

      <Divider sx={{ mx: 2, mb: 2 }} />

      {/* Main Navigation */}
      <List sx={{ px: 2, flex: 1 }}>
        <SidebarItem
          icon={<DashboardIcon color="primary" />}
          label="Dashboard"
        />
        <SidebarItem
          icon={<CalendarMonthIcon color="secondary" />}
          label="Scheduler"
          selected
          sx={{ mb: 1 }}
        />

        {/* Management Section with Collapse */}
        <SidebarItem
          icon={<SchoolIcon color="primary" />}
          label="Management"
          endIcon={openManagement ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={handleManagementClick}
        />

        <Collapse in={openManagement} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <SidebarItem icon={<PersonIcon />} label="Students" nested />
            <SidebarItem icon={<PersonIcon />} label="Teachers" nested />
            <SidebarItem icon={<ClassIcon />} label="Classes" nested />
            <SidebarItem icon={<MeetingRoomIcon />} label="Rooms" nested />
          </List>
        </Collapse>

        {/* <SidebarItem
          icon={
            <Badge badgeContent={3} color="error">
              <NotificationsIcon color="action" />
            </Badge>
          }
          label="Notifications"
        /> */}
      </List>

      {/* <Divider sx={{ mx: 2, mt: 2 }} /> */}

      {/* Footer section with settings */}
      {/* <Box sx={{ p: 2 }}>
        <SidebarItem icon={<SettingsIcon />} label="Settings" sx={{ mb: 0 }} />
      </Box> */}
    </Box>
  );
};

export default Sidebar;
