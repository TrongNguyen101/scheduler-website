import { Typography, Box, Paper } from "@mui/material";
import { Event } from "@/utils/data";

interface TimetableListItemProps {
  event: Event;
}

const formatTimeRange = (start: Date, end: Date) =>
  `${start.getHours().toString().padStart(2, "0")}:${start
    .getMinutes()
    .toString()
    .padStart(2, "0")} - ${end.getHours().toString().padStart(2, "0")}:${end
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

const TimetableListItem = ({ event }: TimetableListItemProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 1.5,
        borderLeft: `5px solid ${event.CategoryColor || "#1976d2"}`,
        backgroundColor: "#fafafa",
        height: "auto",
        minHeight: 200,
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Slot & Time */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="green"
          sx={{ fontSize: 14 }}
        >
          Slot {event.Slot} —{" "}
          {formatTimeRange(new Date(event.StartTime), new Date(event.EndTime))}
        </Typography>
      </Box>

      {/* Main content */}
      <Box>
        <Typography
          fontWeight="bold"
          sx={{ fontSize: 14, color: event.CategoryColor || "primary.main" }}
        >
          Room: {event.Room}
        </Typography>
        <Typography sx={{ fontSize: 13 }} fontWeight="bold">
          Subject Code: {event.SubjectCode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Group class: {event.Class}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lecturer: {event.Lecturer}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TimetableListItem;
