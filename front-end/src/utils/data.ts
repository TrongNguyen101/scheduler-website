export interface Event {
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

export const eventData: Event[] = [
  {
    Id: 1,
    Subject: "Event title",
    StartTime: new Date(2025, 4, 11, 9, 30),
    EndTime: new Date(2025, 4, 11, 10, 30),
    CategoryColor: "#7FBA00",
  },
  {
    Id: 2,
    Subject: "Event title",
    StartTime: new Date(2025, 4, 11, 11, 0),
    EndTime: new Date(2025, 4, 11, 12, 30),
    CategoryColor: "#00A2ED",
  },
  {
    Id: 3,
    Subject: "Event title",
    StartTime: new Date(2025, 4, 11, 14, 0),
    EndTime: new Date(2025, 4, 11, 15, 30),
    CategoryColor: "#FF5733",
  },
  {
    Id: 4,
    Subject: "Event title",
    StartTime: new Date(2025, 4, 11, 12, 0),
    EndTime: new Date(2025, 4, 11, 13, 30),
    CategoryColor: "#AB47BC",
  },
  {
    Id: 5,
    Subject: "Backlog",
    StartTime: new Date(2025, 4, 11, 11, 0),
    EndTime: new Date(2025, 4, 11, 11, 45),
    CategoryColor: "#9E9E9E",
  },
  {
    Id: 6,
    Subject: "Review Next Sprint",
    StartTime: new Date(2025, 4, 11, 16, 0),
    EndTime: new Date(2025, 4, 11, 16, 30),
    CategoryColor: "#9E9E9E",
  },
];
