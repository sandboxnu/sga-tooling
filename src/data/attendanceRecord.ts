import { AttendanceRecord } from "../util/Types";

export const mockAttendanceRecord: AttendanceRecord[] = [
  {
    memberId: 1,
    attendanceStatus: "ODE",
    event: {
      id: 1,
      eventName: "Y2K Party",
      startTime: new Date("1999-12-31 20:00:00"),
      endTime: new Date("2000-01-01 00:00:00"),
      signInClosed: true,
      location: "Richards 253",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur justo a mi faucibus faucibus. Maecenas pretium efficitur ipsum eget laoreet. Nullam sed convallis turpis, eget mattis tellus. In magna mauris, accumsan eu mauris a, tempus placerat neque. Curabitur quis molestie nibh. Integer ullamcorper nisl id ligula tristique, eu tempor elit mattis. Praesent justo mauris, pulvinar vel feugiat id, lobortis vitae neque.",
      tags: ["Senate", "Committee", "Guest Speaker"],
    },
  },
  {
    memberId: 1,
    attendanceStatus: "KEDE",
    event: {
      id: 2,
      eventName: "Sandbox GM",
      startTime: new Date("2023-01-22 14:00:00"),
      endTime: new Date("2023-01-22 17:00:00"),
      signInClosed: true,
      location: "Richards 253",
      description:
        "Duis nec convallis neque. Sed ac urna eget magna pretium gravida. Quisque nec nunc vitae augue tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce et felis at ante pretium ornare. Nam quis magna eget nisl tincidunt efficitur quis at enim. Aliquam tempus scelerisque elit, eu laoreet est. Curabitur imperdiet magna sed arcu interdum consequat. Duis hendrerit nibh vel sagittis consectetur. Nulla in nisl neque. Nullam nunc elit, tristique accumsan metus ullamcorper, tristique ultricies ligula.",
      tags: ["Guest Speaker"],
    },
  },
  {
    memberId: 1,
    attendanceStatus: "LEDLE",
    event: {
      id: 3,
      eventName: "Sandbox GM 2",
      startTime: new Date("2023-01-22 15:00:00"),
      endTime: new Date("2023-01-22 18:00:00"),
      signInClosed: true,
      location: "Richards 253",
      description:
        "Duis nec convallis neque. Sed ac urna eget magna pretium gravida. Quisque nec nunc vitae augue tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce et felis at ante pretium ornare. Nam quis magna eget nisl tincidunt efficitur quis at enim. Aliquam tempus scelerisque elit, eu laoreet est. Curabitur imperdiet magna sed arcu interdum consequat. Duis hendrerit nibh vel sagittis consectetur. Nulla in nisl neque. Nullam nunc elit, tristique accumsan metus ullamcorper, tristique ultricies ligula.",
      tags: ["Guest Speaker", "Committee"],
    },
  },
  {
    memberId: 1,
    attendanceStatus: "ODELE",
    event: {
      id: 5,
      eventName: "Year-long Fundraiser",
      startTime: new Date("2023-01-01 00:00:00"),
      endTime: new Date("2023-12-31 23:59:59"),
      signInClosed: false,
      location: "Snell Quad",
      description:
        "Duis nec convallis neque. Sed ac urna eget magna pretium gravida. Quisque nec nunc vitae augue tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce et felis at ante pretium ornare. Nam quis magna eget nisl tincidunt efficitur quis at enim. Aliquam tempus scelerisque elit, eu laoreet est. Curabitur imperdiet magna sed arcu interdum consequat. Duis hendrerit nibh vel sagittis consectetur. Nulla in nisl neque. Nullam nunc elit, tristique accumsan metus ullamcorper, tristique ultricies.",
      tags: ["Senate", "Guest Speaker"],
    },
  },
];
