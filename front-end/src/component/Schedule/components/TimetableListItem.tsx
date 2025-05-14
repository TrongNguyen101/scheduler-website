import { Typography, Box, Paper, Grid, Link } from "@mui/material";
import { Event, slotColor } from "@/utils/data";
import NextLink from "next/link";
interface TimetableListItemProps {
  event: Event;
}

// Helper function to format a time range from startDate and endDate of slot
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
        borderLeft: `5px solid ${
          event.Slot && event.Slot <= 4
            ? slotColor[event.Slot - 1].color
            : "#1976d2"
        }`,
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
        <Typography fontWeight="bold" sx={{ fontSize: 14 }}>
          Room: {event.Room}
        </Typography>
        <Typography sx={{ fontSize: 13 }} fontWeight="bold">
          Subject Code:{" "}
          <Link
            component={NextLink}
            href={"/#"}
            underline="hover"
            fontSize={14}
          >
            {event.SubjectCode}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Group class: {event.Class}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lecturer: {event.Lecturer}
        </Typography> */}
        {event.IsOnline ? (
          <Grid
            variant="body2"
            color="black"
            fontWeight="500"
            fontSize={20}
            mt={2}
            display="flex"
            alignItems={"center"}
          >
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#00e676",
                boxShadow: "0 0 0 rgba(0, 230, 118, 0.4)",
                animation: "pulse 1.5s infinite",
                "@keyframes pulse": {
                  "0%": {
                    transform: "scale(1)",
                    boxShadow: "0 0 0 0 rgba(0, 230, 118, 0.4)",
                  },
                  "70%": {
                    transform: "scale(1.2)",
                    boxShadow: "0 0 0 8px rgba(0, 230, 118, 0)",
                  },
                  "100%": {
                    transform: "scale(1)",
                    boxShadow: "0 0 0 0 rgba(0, 230, 118, 0)",
                  },
                },
              }}
            />
            <Box pl={2}>Online</Box>
          </Grid>
        ) : (
          <></>
        )}
      </Box>
    </Paper>
  );
};

export default TimetableListItem;
