import { AttendanceChange, ChangeStatus, RequestType } from "../util/Types";
export const mockAttendanceChange: AttendanceChange[] = [
  {
    uuid: "1",
    member_id: "1",
    event_id: "1",
    type: RequestType.ABSENT,
    time_submitted: new Date("2000-01-01 00:00:00"),
    change_status: ChangeStatus.NOT_REVIEWED,
    reason: "Family reasons",
  },
  {
    uuid: "2",
    member_id: "2",
    event_id: "2",
    type: RequestType.ARRIVING_LATE,
    time_submitted: new Date("2001-01-01 00:00:00"),
    change_status: ChangeStatus.EXCUSED,
    reason: "Arriving late due to traffic on I90.",
    time_arriving: new Date("2001-01-01 12:00:00"),
  },
  {
    uuid: "3",
    member_id: "1",
    event_id: "3",
    type: RequestType.LEAVING_EARLY,
    time_submitted: new Date("2002-01-01 00:00:00"),
    change_status: ChangeStatus.UNEXCUSED,
    reason: "Leaving early to go to a birthday party.",
    time_leaving: new Date("2002-01-01 14:00:00"),
  },
];
