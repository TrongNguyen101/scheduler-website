import { useEffect, useState } from "react";
import { Select, MenuItem, Box, Typography } from "@mui/material";
import TimetableList from "./TimetableList"; // <- Đường dẫn tới component của bạn
import { Event, eventData } from "@/utils/data";

// WeekRange type
type WeekRange = {
  start: Date;
  end: Date;
  label: string; // ex: "20/01 To 27/01"
};

// Generate an array of weekly ranges for the specified year
const generateWeekRanges = (year: number) => {
  const weeks: WeekRange[] = [];
  const current = new Date(year, 0, 1); // Start from January 1st of the year

  while (current.getDay() !== 1) current.setDate(current.getDate() + 1); // Move to the first Monday of the year

  let currentWeek;
  const today = new Date();

  // Continue adding weeks until the year ends
  while (current.getFullYear() === year) {
    const start = new Date(current); // Monday
    const end = new Date(current);
    end.setDate(start.getDate() + 6); // End of the week (Sunday)

    const item = {
      start,
      end,
      label: `${start.getDate().toString().padStart(2, "0")}/${(
        start.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")} To ${end.getDate().toString().padStart(2, "0")}/${(
        end.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`, // Format label as "dd/mm To dd/mm"
    };
    weeks.push(item);

    // Set currentWeek if today is in this range
    if (start.getTime() <= today.getTime() && today.getTime() <= end.getTime())
      currentWeek = item;

    // Move to the next week
    current.setDate(current.getDate() + 7);
  }

  return { weeks, currentWeek };
};

// Main component that includes year and week filters and displays events
const TimetableWithFilter = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const weeksGenerate = generateWeekRanges(currentYear);
  const [weeks, setWeeks] = useState<WeekRange[]>(weeksGenerate.weeks);
  const [selectedWeek, setSelectedWeek] = useState<WeekRange>(
    weeksGenerate.currentWeek ? weeksGenerate.currentWeek : weeks[0]
  );

  // Regenerate week list whenever selected year changes
  useEffect(() => {
    const newWeeks = generateWeekRanges(selectedYear);
    setWeeks(newWeeks.weeks);
    setSelectedWeek(
      newWeeks.currentWeek ? newWeeks.currentWeek : newWeeks.weeks[0]
    );
  }, [selectedYear]);

  // Filter events to only include those within the selected week
  const filteredEvents: Event[] = eventData.filter((event) => {
    const eventDate = new Date(event.StartTime);
    return eventDate >= selectedWeek.start && eventDate <= selectedWeek.end;
  });

  return (
    <Box sx={{ p: 1, width: "100%" }}>
      {/* Title section */}
      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
        fontSize={22}
      >
        Schedule for the week
      </Typography>

      <Box sx={{ pl: 1, pr: 1 }}>
        <Box display="flex" mb={2} gap={2} flexWrap="wrap">
          {/* Select year */}
          <Box sx={{ minWidth: 80, maxWidth: 120 }}>
            <Select
              fullWidth
              size="small"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {Array.from({ length: 5 }, (_, i) => currentYear - 2 + i).map(
                (year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                )
              )}
            </Select>
          </Box>

          {/* Select date */}
          <Box sx={{ minWidth: 160, maxWidth: 220 }}>
            <Select
              fullWidth
              size="small"
              value={selectedWeek.label}
              onChange={(e) => {
                const w = weeks.find((w) => w.label === e.target.value);
                if (w) setSelectedWeek(w);
              }}
            >
              {weeks.map((week) => (
                <MenuItem key={week.label} value={week.label}>
                  {week.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Timetable show schedule by week selected */}
        <TimetableList events={filteredEvents} startDate={selectedWeek.start} />
      </Box>
    </Box>
  );
};

export default TimetableWithFilter;
