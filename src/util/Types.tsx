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
  id: number;
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
  //make enum
  request_type: string;
  submit_time: Date;
  //make enum
  change_status: string;
  reason: string;
  arrive_time?: Date;
  leave_time?: Date;
};

export enum EventStatus {
  Live = "bg-sga-red",
  First = "bg-black",
  Rest = "bg-white",
}

export enum ReportReason {
  Dismised = "dismissed",
  Discussion = "discussion",
  Warning = "warning",
  Removed = "removed",
}
