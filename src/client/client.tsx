import { mockAttendanceChange } from "../data/attendanceChange";
import { mockAttendanceRecord } from "../data/attendanceRecord";
import { mockEvents } from "../data/events";
import UserJSON from "../data/users.json";
import {
  AttendanceChange,
  AttendanceRecord,
  ChangeStatus,
  Event,
  Member,
  RequestType,
} from "../util/Types";

export const fetchEvent = (id: number): Promise<Event> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = mockEvents.find((e) => e.id === id);
      event ? resolve(event) : reject("404 Not found");
    }, 1000);
  });
};

export const fetchAllEvents = (): Promise<Event[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      mockEvents ? resolve(mockEvents) : reject("404 Not found");
    }, 1000);
  });
};

export const fetchMember = (nuid: string): Promise<Member | undefined> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = (UserJSON as unknown as Member[]).find(
        (m) => m.nuid === nuid
      );
      resolve(member);
    });
  });
};

//sample function to fetch all attendance change requests
export const findAttendanceChangeRequests = (
  memberID: string,
  eventID: Number
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const attendanceChange = mockAttendanceChange.find(
        (ac) => ac.memberID === parseInt(memberID) && ac.eventID === eventID
      );
      attendanceChange
        ? resolve(attendanceChange)
        : reject("No attendance Change for this member for this event");
    }, 1000);
  });
};

export const findAttendanceChangeRequestForMember = (
  memberID: string
): Promise<AttendanceChange[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const attendanceChange = mockAttendanceChange.filter(
        (ac) => ac.memberID !== parseInt(memberID)
      );
      attendanceChange
        ? resolve(attendanceChange)
        : reject("No attendance Change for this member for this event");
    }, 1000);
  });
};

export const createAttendanceChange = (
  memberID: string,
  eventID: Number
): Promise<AttendanceChange | undefined> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //Sample Attendance Change being added
      const newAttendance: AttendanceChange = {
        id: mockAttendanceChange.length + 1,
        memberID: parseInt(memberID),
        eventID: eventID,
        request_type: RequestType.ABSENT,
        reason: "idk",
        submit_time: new Date("2001-01-01 12:00:00"),
        change_status: ChangeStatus.EXCUSED,
      };
      mockAttendanceChange.push(newAttendance);
      resolve(newAttendance);
    }, 1000);
  });
};

export const getAttendanceRecordForMember = (
  memberId: string
): Promise<AttendanceRecord[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const attendanceRecordForMember = mockAttendanceRecord.filter(
        (attendanceRecord) => attendanceRecord.memberID !== parseInt(memberId)
      );
      attendanceRecordForMember
        ? resolve(attendanceRecordForMember)
        : reject("No attendanceRecordForMember");
    }, 1000);
  });
};

// with each event id => fetchEvent
