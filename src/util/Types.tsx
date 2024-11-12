export type JWTAuthToken = {
  data: string;
};

export type Response<T> = {
  data?: T;
  error?: string;
  status?: number;
};

export type AuthResponse = {
  jwt: string;
  member: Member;
};

export type Event = {
  id: string;
  eventName: string;
  startTime: Date;
  endTime: Date;
  signInClosed: boolean;
  location?: string;
  description: string;
  membershipGroup?: string[];
  tags?: string[];
  status?: EventStatus;
};

export type Member = {
  id: string;
  nuid: string;
  firstName: string;
  lastName: string;
  email: string;
  activeMember: boolean;
  votingRights: boolean;
  receiveNotPresentEmail: boolean;
  includeInQuorum: boolean;
  signInBlocked: boolean;
};

export type Attendance = {
  personId: string;
  eventId: string;
  attendanceStatus: string;
};

export type AttendanceChange = {
  id: string;
  name: string;
  timeSubmitted: Date;
  dateOfChange: Date;
  type: RequestType;
  changeStatus: ChangeStatus;
  reason: string;
  timeArriving?: Date;
  timeLeaving?: Date;
  memberId: string;
  eventId: string;
};

export type AttendanceChangeCreate = {
  name: string;
  timeSubmitted: Date;
  dateOfChange: Date;
  type: RequestType;
  reason: string;
  timeArriving?: Date;
  timeLeaving?: Date;
  memberId: string;
  eventId: string;
};

export enum RequestType {
  ABSENT = "absent",
  ARRIVING_LATE = "arriving late",
  LEAVING_EARLY = "leaving early",
  BOTH = "arriving late, leaving early",
}

export enum ChangeStatus {
  EXCUSED = "excused",
  UNEXCUSED = "unexcused",
  NOT_REVIEWED = "pending",
  UNREGISTER = "unregister",
}

export enum EventStatus {
  Live = "bg-sga-red",
  First = "bg-black lg:bg-[#474747]",
  Rest = "bg-white",
}

export enum ReportReason {
  DISMISSED = "dismissed",
  DISCUSSION = "discussion",
  WARNING = "warning",
  REMOVED = "removed",
}

export type AttendanceData = {
  reason: string;
  requestType?: RequestType;
  submissionTime: Date;
  timeArriving?: Date;
  timeLeaving?: Date;
};

export type AttendanceRecord = {
  memberId: number;
  attendanceStatus: string;
  event: Event;
};

export type AttendanceTag = "K" | "A" | "L" | "D" | "O" | "N" | "E";

export enum LoginError {
  DEACTIVATED,
  BLOCKED,
  OTHER,
  DOES_NOT_EXIST,
  NONE,
  UNKNOWN,
}
