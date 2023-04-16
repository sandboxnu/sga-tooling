import { Report, ReportReason } from "../util/Types";

/*

id: Number,
member_id: Number,
reported_time: Date,
report_reason: string,
report_description?: ReportReason,
event_id?: Number,
request_id?: Number,
resolution_time: Date,
resolution_action: Date,

*/

export const mockReports: Report[] = [
  {
    id: 1,
    member_id: 25,
    reported_time: new Date("2000-01-01 00:00:00"),
    report_reason: "Reasonable reason 1",
    report_description: ReportReason.DISMISSED,
    event_id: 1,
    request_id: 1,
    resolution_time: new Date("2000-01-02 00:00:00"),
    resolution_action: new Date("2000-01-03 00:00:00"),
  },
  {
    id: 2,
    member_id: 12,
    reported_time: new Date("2000-02-01 12:00:00"),
    report_reason: "Reasonable reason 2",
    report_description: ReportReason.WARNING,
    event_id: 1,
    request_id: 2,
    resolution_time: new Date("2000-02-01 13:00:00"),
    resolution_action: new Date("2000-02-01 14:00:00"),
  },
  {
    id: 3,
    member_id: 16,
    reported_time: new Date("2020-01-01 12:00:00"),
    report_reason: "Reasonable reason 3",
    report_description: ReportReason.DISCUSSION,
    event_id: 1,
    request_id: 3,
    resolution_time: new Date("2020-02-01 12:00:00"),
    resolution_action: new Date("2020-03-01 12:00:00"),
  },
  {
    id: 1,
    member_id: 1,
    reported_time: new Date("2000-01-01 00:00:00"),
    report_reason: "something",
    event_id: 1,
    request_id: 3,
    resolution_action: new Date("2000-01-01 00:00:00"),
    resolution_time: new Date("2000-01-01 00:00:00"),
  },
  {
    id: 1,
    member_id: 1,
    reported_time: new Date("2000-01-01 00:00:00"),
    report_reason: "something",
    event_id: 2,
    request_id: 3,
    resolution_action: new Date("2000-01-01 00:00:00"),
    resolution_time: new Date("2000-01-01 00:00:00"),
  },

  {
    id: 1,
    member_id: 1,
    reported_time: new Date("2000-01-01 00:00:00"),
    report_reason: "something",
    event_id: 3,
    request_id: 3,
    resolution_action: new Date("2000-01-01 00:00:00"),
    resolution_time: new Date("2000-01-01 00:00:00"),
  },

  {
    id: 1,
    member_id: 1,
    reported_time: new Date("2000-01-01 00:00:00"),
    report_reason: "something",
    event_id: 4,
    request_id: 3,
    resolution_action: new Date("2000-01-01 00:00:00"),
    resolution_time: new Date("2000-01-01 00:00:00"),
  },

  {
    id: 1,
    member_id: 1,
    reported_time: new Date("2000-01-01 00:00:00"),
    report_reason: "something",
    event_id: 1,
    request_id: 3,
    resolution_action: new Date("2000-01-01 00:00:00"),
    resolution_time: new Date("2000-01-01 00:00:00"),
  },
];
