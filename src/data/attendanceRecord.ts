//for now still only doing this with the one user that we have
import { AttendanceRecord, AttendanceStatus } from "../util/Types";
export const mockAttendanceRecord: AttendanceRecord[] = [
  {
    memberID: 1,
    eventID: 1,
    attendance_status: AttendanceStatus.ATTENDED,
  },
  {
    memberID: 1,
    eventID: 2,
    attendance_status: AttendanceStatus.LEFT_EARLY,
  },
  {
    memberID: 1,
    eventID: 3,
    attendance_status: AttendanceStatus.ABSENT,
  },
  {
    memberID: 1,
    eventID: 5,
    attendance_status: AttendanceStatus.ATTENDED,
  },
];
