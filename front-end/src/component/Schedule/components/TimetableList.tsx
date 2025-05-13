import { Box, Typography, Stack, useTheme, useMediaQuery } from "@mui/material";
import { Event } from "@/utils/data";
import TimetableListItem from "./TimetableListItem";

interface TimetableListProps {
  events: Event[];
  startDate: Date;
}

const getNext7Days = (startDate: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }
  return days;
};

const TimetableList = ({ events, startDate }: TimetableListProps) => {
  const weekDates = getNext7Days(startDate);

  const groupedEvents = weekDates.map((date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const eventsForDay = events
      .filter((event) => {
        const eventDate = new Date(event.StartTime);
        return eventDate.toDateString() === date.toDateString();
      })
      .sort(
        (a, b) =>
          new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime()
      );

    return { dayName, date, events: eventsForDay };
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: 2,
        width: "100%",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {groupedEvents.map(({ dayName, date, events }) => (
          <Box
            key={date.toISOString()}
            sx={{
              flex: "1 1 150px",
              maxWidth: "200px",
              border: "1px solid #eee",
              borderRadius: 1,
              p: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              textAlign="center"
              sx={{ mb: 1 }}
            >
              {date.getDate().toString().padStart(2, "0") +
                "/" +
                (date.getMonth() + 1).toString().padStart(2, "0")}
              <br />
              {dayName}
            </Typography>

            {events.length > 0 ? (
              <Stack spacing={1}>
                {events.map((event) => (
                  <TimetableListItem key={event.Id} event={event} />
                ))}
              </Stack>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                No events
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TimetableList;
