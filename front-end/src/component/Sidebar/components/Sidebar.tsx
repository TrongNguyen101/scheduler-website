import { Box, List } from "@mui/material";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import TodayIcon from "@mui/icons-material/Today";
import ClassIcon from "@mui/icons-material/Class";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Main Navigation */}
      <List sx={{ px: 1 }}>
        <SidebarItem icon={<CalendarMonth />} label="Sheduler" />
        <SidebarItem icon={<SchoolIcon />} label="Student Management" />
        <SidebarItem icon={<TodayIcon />} label="Teacher Management" />
        <SidebarItem icon={<ClassIcon />} label="Class Management" />
        <SidebarItem icon={<ScheduleIcon />} label="Room Management" />
      </List>
    </Box>
  );
};

export default Sidebar;
