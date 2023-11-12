import { AttendanceRecord } from "../util/Types";

// in Matts test DB the strings are flipped where E comes second
export const mockAttendanceRecord: AttendanceRecord[] = [
  {
    memberID: 1,
    eventID: 1,
    attendance_status: "ODE",
  },
  {
    memberID: 1,
    eventID: 2,
    attendance_status: "KEDE",
  },
  {
    memberID: 1,
    eventID: 3,
    attendance_status: "LEDLE",
  },
  {
    memberID: 1,
    eventID: 5,
    attendance_status: "ODELE",
  },
];
