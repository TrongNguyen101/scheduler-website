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
      </List>
    </Box>
  );
};

export default Sidebar;
