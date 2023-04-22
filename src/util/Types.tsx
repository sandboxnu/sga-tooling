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

export type Report = {
  id: Number;
  member_id: Number;
  reported_time: Date;
  report_reason: string;
  report_description?: ReportReason;
  event_id?: Number;
  request_id?: Number;
  resolution_time: Date;
  resolution_action: Date;
};

export type AttendanceChange = {
  id: Number;
  request_type: RequestType;
  submit_time: Date;
  change_status: ChangeStatus;
  reason: string;
  arrive_time?: Date;
  leave_time?: Date;
};

// Represents the types that a request type can be. 
// Enum used for the AttendanceChangeRequest type.
// Attendance change requests are typically only generated when someone clicks unregister, 
// and they can be the following types:
export enum RequestType {
  ABSENT = "absent",
  ARRIVING_LATE = "arriving late",
  LEAVING_EARLY = "dismissal",
}

// Represents the different statuses a request can be. 
// Enum used for the AttendanceChangeRequest type.
// If someone reregisters for an event after unregistering, 
// the initial request is current set to dismissed. 
export enum ChangeStatus {
  EXCUSED = "excused",
  UNEXCUSED = "unexcused",
  DISMISSED = "dismissed",
  NOT_REVIEWED = "pending"
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
