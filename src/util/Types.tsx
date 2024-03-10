export type Event = {
  uuid: string;
  event_name: string;
  start_time: Date;
  end_time?: Date;
  sign_in_closed: boolean;
  description: string;
  location: string;
  status?: EventStatus;
  tags?: string[];
  membership_group: SGATags[];
};

// may not be needed
export type MembershipGroupTags = {
  membership_group: SGATags;
};

export enum SGATags {
  NEW_SENATORS = "New Senators Fall 2022",
  ALL_ACTIVE = "All active",
}

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
  uuid: string;
  memberID: string;
  request_type: RequestType;
  eventID: string;
  submit_time: Date;
  change_status: ChangeStatus;
  reason: string;
  arrive_time?: Date;
  leave_time?: Date;
};

export enum RequestType {
  ABSENT = "absent",
  ARRIVING_LATE = "arriving late",
  LEAVING_EARLY = "leaving early",
  BOTH = "both",
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
  request_type?: RequestType;
  submission_time: Date;
  time_arriving?: Date;
  time_leaving?: Date;
};

export type AttendanceEvent = {
  member_id: string;
  event_id: string;
};

export type createdAttendanceChange = AttendanceEvent & AttendanceData;

export type AttendanceRecord = {
  memberID: number;
  eventID: number;
  attendance_status: string;
};

export type AttendanceTag = "K" | "A" | "L" | "D" | "O" | "N" | "E";
