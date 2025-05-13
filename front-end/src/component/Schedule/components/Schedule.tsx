import { useEffect, useState } from "react";
import { Select, MenuItem, Box, Grid, Typography } from "@mui/material";
import TimetableList from "./TimetableList"; // <- Đường dẫn tới component của bạn
import { Event, eventData } from "@/utils/data";

// WeekRange type
type WeekRange = {
  start: Date;
  end: Date;
  label: string;
};

// Hàm generate các tuần trong năm
const generateWeekRanges = (year: number) => {
  const weeks: WeekRange[] = [];
  // const today = new Date();
  const current = new Date(year, 0, 1);
  while (current.getDay() !== 1) current.setDate(current.getDate() + 1); // Tìm Monday

  let currentWeek;

  const today = new Date();
  while (current.getFullYear() === year) {
    const start = new Date(current);
    const end = new Date(current);
    end.setDate(start.getDate() + 6);
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
        .padStart(2, "0")}`,
    };

    weeks.push(item);

    if (start.getTime() <= today.getTime() && today.getTime() <= end.getTime())
      currentWeek = item;

    current.setDate(current.getDate() + 7);
  }

  return { weeks, currentWeek };
};

const TimetableWithFilter = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const weeksGenerate = generateWeekRanges(currentYear);
  const [weeks, setWeeks] = useState<WeekRange[]>(weeksGenerate.weeks);
  const [selectedWeek, setSelectedWeek] = useState<WeekRange>(
    weeksGenerate.currentWeek ? weeksGenerate.currentWeek : weeks[0]
  );

  // Khi năm thay đổi thì generate lại danh sách tuần
  useEffect(() => {
    const newWeeks = generateWeekRanges(selectedYear);
    setWeeks(newWeeks.weeks);
    setSelectedWeek(
      newWeeks.currentWeek ? newWeeks.currentWeek : newWeeks.weeks[0]
    );
  }, [selectedYear]);

  // Lọc sự kiện trong tuần đang chọn
  const filteredEvents: Event[] = eventData.filter((event) => {
    const eventDate = new Date(event.StartTime);
    return eventDate >= selectedWeek.start && eventDate <= selectedWeek.end;
  });

  return (
    <Box sx={{ p: 1, width: "100%" }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign={"center"}
        fontSize={22}
      >
        Schedule for the week
      </Typography>

      <Box
        display="flex"
        mb={2}
        gap={2}
        flexWrap="wrap"
      >
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

      {/* Timetable hiển thị theo tuần được chọn */}
      <TimetableList events={filteredEvents} startDate={selectedWeek.start} />
    </Box>
  );
};

export default TimetableWithFilter;
