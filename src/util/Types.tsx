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

export type AttendanceRecord = {
  memberID: number;
  eventID: number;
  attendance_status: string;
};

export type AttendanceTag = "K" | "A" | "L" | "D" | "O" | "N" | "E";

// probabably don't need this
export type Vote = {
  id: number;
  memberID: number;
  voteID: number;
  voteType: VoteSelection;
};

export enum VoteSelection {
  YES = "Y",
  ABSTAIN = "A",
  NO = "N",
}

//"A" | "Y" | "N";
export type VoteQuestions = {
  id: string;
  question: string;
  // optional subtext/description for the vote
  description?: string;
  // Duration for how long the voting period lasts:
  time_start: Date;
  time_end: Date;
};

// variable names are certainly subject to change...
export type VoteHistory = {
  memberID: string;
  voteID: string;
  voteSelection: VoteSelection;
};
