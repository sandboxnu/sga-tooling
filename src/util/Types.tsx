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
  //ids are technically a uuid for each of these, so it should be a string, but Number is easier to work with
  id: Number;
  //id of the member who submitted this request
  memberID: Number;
  request_type: RequestType;
  //id of the event the attendance change corresponds to
  eventID: Number;
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
