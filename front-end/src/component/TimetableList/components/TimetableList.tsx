import { Box, Typography } from "@mui/material";
import { Event } from "@/utils/data";
import TimetableListItem from "./TimetableListItem";

interface TimetableListProps {
  events: Event[];
}

const TimetableList = ({ events }: TimetableListProps) => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime()
  );

  return (
    <Box sx={{ bgcolor: "white", borderRadius: 2, p: 2, height: "100%" }}>
      <Typography variant="h6" mb={2}>
        Today’s Schedule
      </Typography>
      {sortedEvents.map((event) => (
        <TimetableListItem key={event.Id} event={event} />
      ))}
    </Box>
  );
};

export default TimetableList;
