import { AttendanceChange, ChangeStatus, RequestType } from "../util/Types";
export const mockAttendanceChange: AttendanceChange[] = [
  {
    id: 1,
    memberID: 1,
    eventID: "1",
    request_type: RequestType.ABSENT,
    submit_time: new Date("2000-01-01 00:00:00"),
    change_status: ChangeStatus.NOT_REVIEWED,
    reason: "Family reasons",
  },
  {
    id: 2,
    memberID: 2,
    eventID: "2",
    request_type: RequestType.ARRIVING_LATE,
    submit_time: new Date("2001-01-01 00:00:00"),
    change_status: ChangeStatus.EXCUSED,
    reason: "Arriving late due to traffic on I90.",
    arrive_time: new Date("2001-01-01 12:00:00"),
  },
  {
    id: 3,
    memberID: 1,
    eventID: "3",
    request_type: RequestType.LEAVING_EARLY,
    submit_time: new Date("2002-01-01 00:00:00"),
    change_status: ChangeStatus.UNEXCUSED,
    reason: "Leaving early to go to a birthday party.",
    leave_time: new Date("2002-01-01 14:00:00"),
  },
];
