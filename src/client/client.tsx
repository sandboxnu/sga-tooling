import { mockAttendanceChange } from "../data/attendanceChange";
import { mockEvents } from "../data/events";
import UserJSON from "../data/users.json";
import {
  AttendanceChange,
  ChangeStatus,
  Event,
  Member,
  RequestType,
} from "../util/Types";

export function fetchEvent(id: Number): Promise<Event> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = mockEvents.find((e) => e.id === id);
      event ? resolve(event) : reject("404 Not found");
    }, 1000);
  });
}

export function fetchAllEvents(): Promise<Event[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      mockEvents ? resolve(mockEvents) : reject("404 Not found");
    }, 1000);
  });
}

export function fetchMember(nuid: string): Promise<Member | undefined> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = (UserJSON as unknown as Member[]).find(
        (m) => m.nuid === nuid
      );
      console.log("fetchMember", member);
      resolve(member);
    });
  });
}

//sample function to fetch all attendance change requests
export function findAttendanceChangeRequests(
  memberID: string,
  eventID: Number
) {
  return new Promise((resolve, reject) => {
    console.log("currently logged in user's id is: " + memberID);

    //set a timeout after 1000 seconds
    setTimeout(() => {
      const attendanceChange = mockAttendanceChange.find(
        (ac) => ac.memberID === parseInt(memberID) && ac.eventID === eventID
      );
      attendanceChange
        ? resolve(attendanceChange)
        : reject("No attendance Change for this member for this event");
    }, 1000);
  });
}

export function createAttendanceChange(
  memberID: string,
  eventID: Number
): Promise<AttendanceChange | undefined> {
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
      //randomly reject at times
      const randomNumber = Math.floor(Math.random() * 4);
      console.log(randomNumber);
      randomNumber > 1 ? resolve(newAttendance) : reject("500 server Error");
    }, 1000);
  });
}
