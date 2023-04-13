import { AttendanceChange } from "../util/Types";
export const mockAttendanceChange: AttendanceChange[] = [
  {
    id: 3,
    //make enum
    request_type: "something",
    submit_time: new Date("2000-01-01 00:00:00"),
    //make enum
    change_status: "something",
    reason: "reason",
  },
];
