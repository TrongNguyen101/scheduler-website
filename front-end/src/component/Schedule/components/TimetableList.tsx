import { Box, Typography, Stack, useTheme, useMediaQuery } from "@mui/material";
import { Event } from "@/utils/data";
import TimetableListItem from "./TimetableListItem";
import React from "react";

// Props for the TimetableList component
interface TimetableListProps {
  events: Event[]; // List slot to display
  startDate: Date; // The Monday of the selected week
}

// Helper function to get the next 7 days starting from a date
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
  const weekDates = getNext7Days(startDate); // Get Monday -> Sunday of the selected week
  const maxSlot = 4; // Assume each day has maximums 4 slots

  // Group slot by day
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

  // Mobile layout
  if (isMobile) {
    return (
      <Stack spacing={2}>
        {groupedEvents.map(({ dayName, date, events }) => (
          <Box
            key={date.toISOString()}
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography fontWeight="bold" mb={1}>
              {date.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "2-digit",
              })}
            </Typography>

            {[1, 2, 3, 4].map((slot) => {
              const slotEvents = events.filter((e) => e.Slot === slot);
              return (
                <Box key={slot} mb={2}>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="text.secondary"
                    mb={0.5}
                  >
                    Slot {slot}
                  </Typography>
                  {slotEvents.length > 0 ? (
                    <Stack spacing={1}>
                      {slotEvents.map((event) => (
                        <TimetableListItem key={event.Id} event={event} />
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="body2" color="text.disabled">
                      No event
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        ))}
      </Stack>
    );
  }

  // Desktop layout
  return (
    <Box
      sx={{
        overflowX: "auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `80px repeat(${weekDates.length}, 1fr)`,
          gridTemplateRows: `40px repeat(${maxSlot}, auto)`,
          minWidth: 700,
          border: "1px solid #ccc",
          borderCollapse: "collapse",
        }}
      >
        {/* Header row: date */}
        <Box />
        {weekDates.map((date) => (
          <Box
            key={date.toISOString()}
            sx={{
              border: "1px solid #ccc",
              textAlign: "center",
              fontWeight: "bold",
              py: 1,
              background:
                "linear-gradient(to right, #eff6ff, #ffffff, #eef2ff)",
            }}
          >
            {date.toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
            })}
          </Box>
        ))}

        {/* Row by each slot */}
        {Array.from({ length: maxSlot }, (_, slotIdx) => {
          const slot = slotIdx + 1;

          return (
            <React.Fragment key={slot}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  textAlign: "center",
                  fontWeight: "bold",
                  py: 2,
                }}
              >
                Slot {slot}
              </Box>

              {/* Cells for each day at the current slot */}
              {weekDates.map((date) => {
                const cellEvents = events.filter((e) => {
                  const eDate = new Date(e.StartTime);
                  return (
                    e.Slot === slot &&
                    eDate.toDateString() === date.toDateString()
                  );
                });

                return (
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                    }}
                    key={date.toISOString() + slot}
                  >
                    {cellEvents.map((event) => (
                      <TimetableListItem key={event.Id} event={event} />
                    ))}
                  </Box>
                );
              })}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export default TimetableList;
