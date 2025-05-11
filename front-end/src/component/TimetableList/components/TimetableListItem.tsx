import { Event } from "@/utils/data";
import { Typography, ListItem } from "@mui/material";

interface TimetableListItemProps {
  event: Event;
}

const formatTimeRange = (start: Date, end: Date) =>
  `${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} — ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

const TimetableListItem = ({ event }: TimetableListItemProps) => {
  return (
    <ListItem
      disablePadding
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        p: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography fontWeight="medium">{event.Subject}</Typography>
      <Typography variant="body2" color="text.secondary">
        {formatTimeRange(new Date(event.StartTime), new Date(event.EndTime))}
      </Typography>
      {event.Description && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
          {event.Description}
        </Typography>
      )}
    </ListItem>
  );
};

export default TimetableListItem;
