import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ViewsDirective,
  ViewDirective,
  TimelineMonth,
  TimelineViews,
} from "@syncfusion/ej2-react-schedule";
import CalendarHeader from "./CalendarHeader";
import { registerSyncfusionLicense } from "@/utils/registerLicense";

// Define allowed view options
type ViewOption = "Day" | "Week" | "WorkWeek" | "Month";

// Define event structure
interface Event {
  Id: number;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  IsAllDay?: boolean;
  Location?: string;
  Description?: string;
  CategoryColor?: string;
  IsReadonly?: boolean;
}

registerSyncfusionLicense();

const Calendar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // const [currentView, setCurrentView] = useState<ViewOption>("Week");
  const [currentDate, setCurrentDate] = useState(new Date());

  let timelineResourceData: Object[] = [
    {
      Id: 61,
      Subject: "Decoding",
      StartTime: new Date(2018, 3, 4, 9, 30),
      EndTime: new Date(2018, 3, 4, 10, 30),
      IsAllDay: false,
      ProjectId: 2,
      TaskId: 2,
    },
    {
      Id: 62,
      Subject: "Bug Automation",
      StartTime: new Date(2018, 3, 4, 13, 30),
      EndTime: new Date(2018, 3, 4, 16, 30),
      IsAllDay: false,
      ProjectId: 2,
      TaskId: 1,
    },
    {
      Id: 63,
      Subject: "Functionality testing",
      StartTime: new Date(2018, 3, 4, 9),
      EndTime: new Date(2018, 3, 4, 10, 30),
      IsAllDay: false,
      ProjectId: 1,
      TaskId: 1,
    },
    {
      Id: 64,
      Subject: "Resolution-based testing",
      StartTime: new Date(2018, 3, 4, 12),
      EndTime: new Date(2018, 3, 4, 13),
      IsAllDay: false,
      ProjectId: 1,
      TaskId: 1,
    },
    {
      Id: 65,
      Subject: "Test report Validation",
      StartTime: new Date(2018, 3, 4, 15),
      EndTime: new Date(2018, 3, 4, 18),
      IsAllDay: false,
      ProjectId: 1,
      TaskId: 1,
    },
    {
      Id: 66,
      Subject: "Test case correction",
      StartTime: new Date(2018, 3, 4, 14),
      EndTime: new Date(2018, 3, 4, 16),
      IsAllDay: false,
      ProjectId: 1,
      TaskId: 2,
    },
    {
      Id: 67,
      Subject: "Bug fixing",
      StartTime: new Date(2018, 3, 4, 14, 30),
      EndTime: new Date(2018, 3, 4, 18, 30),
      IsAllDay: false,
      ProjectId: 2,
      TaskId: 2,
    },
    {
      Id: 68,
      Subject: "Run test cases",
      StartTime: new Date(2018, 3, 4, 17, 30),
      EndTime: new Date(2018, 3, 4, 19, 30),
      IsAllDay: false,
      ProjectId: 1,
      TaskId: 2,
    },
    {
      Id: 70,
      Subject: "Bug Automation",
      StartTime: new Date(2018, 3, 4, 18, 30),
      EndTime: new Date(2018, 3, 4, 20),
      IsAllDay: false,
      ProjectId: 2,
      TaskId: 1,
    },
  ];

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* <CalendarHeader
        currentDate={currentDate}
        currentView={currentView}
        onViewChange={setCurrentView}
      /> */}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <ScheduleComponent
          width="100%"
          height="100%"
          currentView="Week"
          selectedDate={currentDate}
          eventSettings={{
            dataSource: timelineResourceData,
          }}
        >
          <ViewsDirective>
            {/* <ViewDirective option="Day" /> */}
            <ViewDirective option="Week" />
            <ViewDirective option="TimelineWeek" />
            <ViewDirective option="Month" />
            <ViewDirective option="TimelineMonth" />
          </ViewsDirective>
          <Inject services={[Week, TimelineMonth, Month, TimelineViews]} />
        </ScheduleComponent>
      </Box>
    </Box>
  );
};

export default Calendar;
