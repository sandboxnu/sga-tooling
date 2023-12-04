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
  LEAVING_EARLY = "leaving early",
  BOTH = "both",
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
  request_type?: RequestType;
  submission_time: Date;
  time_arriving?: Date;
  time_leaving?: Date;
};

export type AttendanceRecord = {
  memberID: number;
  eventID: number;
  attendance_status: string;
};

export type AttendanceTag = "K" | "A" | "L" | "D" | "O" | "N" | "E";

export const AttendanceTagToText: Record<AttendanceTag, string> = {
  K: "Absent",
  A: "Absent",
  L: "Late Arrival",
  D: "Early Dismissal",
  O: "Attendend",
  N: "Not Required ",
  E: "Excused ",
};

export const AttendanceTagToClassName: Record<AttendanceTag, string> = {
  L: "bg-attendance-yellow border border-attendance-yellow bg-opacity-25",
  D: "bg-attendance-yellow border border-attendance-yellow bg-opacity-25",
  O: "bg-attendance-green border border-attendance-green bg-opacity-25",
  A: "bg-attendance-red border border-attendance-red bg-opacity-25",
  K: "bg-attendance-red border border-attendance-red bg-opacity-25",
  E: "bg-attendance-grey border border-attendance-grey bg-opacity-25",
  N: "bg-attendance-grey border border-attendance-grey bg-opacity-25",
};

export type AttendanceStandingDisplay = {
  text: string;
  className: string;
};

export const AttendanceStandingOptions: AttendanceStandingDisplay[] = [
  {
    text: "Removed",
    className:
      "bg-attendance-grey border border-attendance-grey bg-opacity-25 text-atn-disabled-text",
  },
  {
    text: "On hold",
    className:
      "bg-attendance-yellow border border-attendance-yellow bg-opacity-25 text-attendance-text-yellow",
  },
  {
    text: "At risk",
    className:
      "bg-attendance-red border border-attendance-red bg-opacity-25 text-red-500",
  },
  {
    text: "Good standing",
    className:
      "bg-attendance-green border border-attendance-green bg-opacity-25 text-attendance-text-green",
  },
];
