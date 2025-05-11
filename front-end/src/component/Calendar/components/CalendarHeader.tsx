import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { format, addDays } from "date-fns";

type ViewOption = "Day" | "Week" | "WorkWeek" | "Month";

interface CalendarHeaderProps {
  currentDate: Date;
  currentView: ViewOption;
  onViewChange: (view: ViewOption) => void;
}
const CalendarHeader = ({
  currentDate,
  currentView,
  onViewChange,
}: CalendarHeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Format the date display based on the current view
  const getFormattedDate = () => {
    if (currentView === "Day") {
      return format(currentDate, "EEEE, MMMM d");
    } else if (currentView === "Week" || currentView === "WorkWeek") {
      const start = format(currentDate, "MMM d");
      const end = format(addDays(currentDate, 6), "MMM d");
      return `${start} - ${end}`;
    } else {
      return format(currentDate, "MMMM yyyy");
    }
  };

  // Navigate to today
  const goToToday = () => {
    // This will need to be connected to the Scheduler
    console.log("Go to today");
  };

  // Handle navigation
  const handlePrevious = () => {
    // This will need to be connected to the Scheduler
    console.log("Previous");
  };

  const handleNext = () => {
    // This will need to be connected to the Scheduler
    console.log("Next");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, sm: 3 },
        py: 2,
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          {isMobile ? "Today" : "Today"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton size="small" onClick={handlePrevious}>
          <ChevronLeftIcon />
        </IconButton>

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={goToToday}
          sx={{
            bgcolor: "#4CAF50",
            "&:hover": {
              bgcolor: "#43A047",
            },
            px: 2,
            textTransform: "none",
          }}
        >
          Today
        </Button>

        <IconButton size="small" onClick={handleNext}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          {getFormattedDate()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CalendarHeader;
