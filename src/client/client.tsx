import axios from "axios";
import { mockAttendanceChange } from "../data/attendanceChange";
import { mockAttendanceRecord } from "../data/attendanceRecord";
import { mockEvents } from "../data/events";
import {
  AttendanceChange,
  AttendanceRecord,
  ChangeStatus,
  Event,
  Member,
  RequestType,
  Response,
} from "../util/Types";

/**
 * Gets an event with the given id
 * @param id The id of the event being fetched
 * @returns The event if it can be found, or an error
 */
export function fetchEvent(id: number): Promise<Event> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = mockEvents.find((e) => e.id === id);
      event ? resolve(event) : reject("404 Not found");
    }, 1000);
  });
}

/**
 * Gets all the events
 * @returns An array of events if they can be found, or an error
 */
export function fetchAllEvents(): Promise<Event[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      mockEvents ? resolve(mockEvents) : reject("404 Not found");
    }, 1000);
  });
}

/**
 * Gets the member with the associated nuid
 * @param nuid The nuid of the member
 * @returns The Member with that nuid or undefined
 */
export async function fetchMember(nuid: string): Promise<Response<Member>> {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/member/getMember/?id=${nuid}`
  );
  if (response.status === 200) {
    return {
      data: response.data.member,
      error: "",
    };
  } else {
    return {
      data: undefined,
      error: response.data,
    };
  }
}

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

export const getAttendanceEventsForMember = (
  memberId: string
): Promise<Event[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const attendanceRecordForMember = mockAttendanceRecord.filter(
        (attendanceRecord) => attendanceRecord.memberID !== parseInt(memberId)
      );
      const attendanceEventsForMember = attendanceRecordForMember.map(
        ({ eventID, memberID, attendance_status }) => eventID
      );
      const events = [];
      for (const attendanceEventId of attendanceEventsForMember) {
        for (const actualEvent of mockEvents) {
          if (actualEvent.id === attendanceEventId) {
            events.push(actualEvent);
          }
        }
      }
    }, 1000);
  });
};
