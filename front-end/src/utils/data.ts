export interface Event {
  Id: number;
  Subject: string;
  SubjectCode: string;
  StartTime: Date;
  EndTime: Date;
  IsAllDay?: boolean;
  Location?: string;
  Description?: string;
  CategoryColor?: string;
  IsReadonly?: boolean;
  Class?: string;
  Lecturer?: string;
  Room?: string;
  Slot?: number;
  IsOnline?: boolean;
}

export const eventData: Event[] = [
  {
    Id: 1,
    Subject: "Web Programming",
    SubjectCode: "WDP201",
    Class: "IT201",
    Room: "A101",
    Lecturer: "Dr. Nguyen Van A",
    Slot: 1,
    Description: "Introduction to React and APIs",
    StartTime: new Date(2025, 5, 12, 7, 30),
    EndTime: new Date(2025, 5, 12, 9, 0),
    CategoryColor: "#7FBA00",
    IsOnline: true,
  },
  {
    Id: 2,
    Subject: "Database Systems",
    SubjectCode: "DBI101",
    Class: "IT202",
    Room: "B204",
    Lecturer: "Ms. Tran Thi B",
    Slot: 2,
    Description: "Relational model and SQL queries",
    StartTime: new Date(2025, 5, 13, 9, 15),
    EndTime: new Date(2025, 5, 13, 10, 45),
    CategoryColor: "#00A2ED",
    IsOnline: true,
  },
  {
    Id: 3,
    Subject: "Software Engineering",
    SubjectCode: "SWP301",
    Class: "SE101",
    Room: "C305",
    Lecturer: "Mr. Le Van C",
    Slot: 3,
    Description: "Agile methodologies and Scrum",
    StartTime: new Date(2025, 5, 14, 11, 0),
    EndTime: new Date(2025, 5, 14, 12, 30),
    CategoryColor: "#FF5733",
  },
  {
    Id: 4,
    Subject: "Operating Systems",
    SubjectCode: "OSP202",
    Class: "CS301",
    Room: "D102",
    Lecturer: "Dr. Pham Thi D",
    Slot: 4,
    Description: "Process management and scheduling",
    StartTime: new Date(2025, 5, 14, 13, 30),
    EndTime: new Date(2025, 5, 14, 15, 0),
    CategoryColor: "#AB47BC",
  },
  {
    Id: 5,
    Subject: "Backlog Grooming",
    SubjectCode: "BG200c",
    Class: "Team Meeting",
    Room: "Zoom",
    Lecturer: "Scrum Team",
    Slot: 3,
    Description: "Review and refine backlog items",
    StartTime: new Date(2025, 5, 9, 15, 15),
    EndTime: new Date(2025, 5, 9, 16, 0),
    CategoryColor: "#9E9E9E",
  },
  {
    Id: 6,
    Subject: "Sprint Review",
    SubjectCode: "SEP492",
    Class: "Team Meeting",
    Room: "Zoom",
    Lecturer: "Product Owner",
    Slot: 1,
    Description: "Showcase completed work for feedback",
    StartTime: new Date(2025, 5, 16, 9, 15),
    EndTime: new Date(2025, 5, 16, 10, 0),
    CategoryColor: "#009688",
  },
  {
    Id: 7,
    Subject: "Web Programming",
    SubjectCode: "WDP201",
    Class: "IT201",
    Room: "A101",
    Lecturer: "Dr. Nguyen Van A",
    Slot: 2,
    Description: "Introduction to React and APIs",
    StartTime: new Date(2025, 5, 12, 9, 30),
    EndTime: new Date(2025, 5, 12, 10, 15),
    CategoryColor: "#7FBA00",
  },
  {
    Id: 8,
    Subject: "Web Programming",
    SubjectCode: "WDP201",
    Class: "IT201",
    Room: "A101",
    Lecturer: "Dr. Nguyen Van A",
    Slot: 3,
    Description: "Introduction to React and APIs",
    StartTime: new Date(2025, 5, 12, 10, 30),
    EndTime: new Date(2025, 5, 12, 11, 15),
    CategoryColor: "#7FBA00",
  },
];

export const slotColor = [
  {
    slot: 1,
    color: "#4F46E5", // Indigo - nổi bật, chuyên nghiệp
  },
  {
    slot: 2,
    color: "#10B981", // Emerald - mát mắt, tạo cảm giác tích cực
  },
  {
    slot: 3,
    color: "#F59E0B", // Amber - ấm áp, dễ nhìn
  },
  {
    slot: 4,
    color: "#EC4899", // Pink - nổi bật nhưng không quá chói
  },
];
