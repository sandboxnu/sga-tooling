export type Event = {
  id: number;
  eventName: string;
  startTime: Date;
  endTime: Date;
  signInClosed: boolean;
  location?: string;
  description: string;
  status?: EventStatus;
  tags?: string[];
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

export type AttendanceChange = {
  id: Number;
  memberID: Number;
  request_type: RequestType;
  eventID: Number;
  submit_time: Date;
  change_status: ChangeStatus;
  reason: string;
  arrive_time?: Date;
  leave_time?: Date;
};

export enum RequestType {
  ABSENT = "absent",
  ARRIVING_LATE = "arriving late",
  LEAVING_EARLY = "dismissal",
}

export enum ChangeStatus {
  EXCUSED = "excused",
  UNEXCUSED = "unexcused",
  DISMISSED = "dismissed",
  NOT_REVIEWED = "pending",
}

export enum EventStatus {
  Live = "bg-sga-red",
  First = "bg-black",
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
  request_type: RequestType;
  submission_time: Date;
  time_arriving?: Date;
  time_leaving?: Date;
};

// TODO: while looking at the api there's actually way more cases than these
export enum AttendanceStatus {
  ATTENDED = "Attended",
  LEFT_EARLY = "Late",
  ARRIVED_LATE = "Left Early",
  ABSENT = "Absent",
}

export type AttendanceRecord = {
  memberID: number;
  eventID: number;
  attendance_status: AttendanceStatus;
};
