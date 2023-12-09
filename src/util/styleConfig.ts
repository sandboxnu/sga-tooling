import { AttendanceTag, ChangeStatus, SGATags } from "./Types";

export type TextAndClassNameBuilder = {
  text: string;
  className: string;
};

export enum AttendanceStandingOption {
  REMOVED = "REMOVED",
  ON_HOLD = "ON_HOLD",
  AT_RISK = "AT_RISK",
  GOOD_STANDING = "GOOD_STANDING",
}

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

export const AttendanceStandingOptions: Record<
  AttendanceStandingOption,
  TextAndClassNameBuilder
> = {
  [AttendanceStandingOption.REMOVED]: {
    text: "Removed",
    className:
      "bg-attendance-grey border border-attendance-grey bg-opacity-25 text-atn-disabled-text",
  },
  [AttendanceStandingOption.ON_HOLD]: {
    text: "On hold",
    className:
      "bg-attendance-yellow border border-attendance-yellow bg-opacity-25 text-attendance-text-yellow",
  },
  [AttendanceStandingOption.AT_RISK]: {
    text: "At risk",
    className:
      "bg-attendance-red border border-attendance-red bg-opacity-25 text-red-500",
  },
  [AttendanceStandingOption.GOOD_STANDING]: {
    text: "Good standing",
    className:
      "bg-attendance-green border border-attendance-green bg-opacity-25 text-attendance-text-green",
  },
};

export const AttendanceButtonStyles: Record<
  ChangeStatus,
  TextAndClassNameBuilder
> = {
  [ChangeStatus.NOT_REVIEWED]: {
    text: "Pending",
    className:
      "bg-atn-disabled font-bold rounded px-4 my-2 mr-5 w-32 pointer-events-none",
  },
  [ChangeStatus.EXCUSED]: {
    text: "Excused",
    className:
      "bg-attendance-grey text-white font-bold rounded px-4 my-2 mr-5 w-32 pointer-events-none",
  },
  [ChangeStatus.UNEXCUSED]: {
    text: "Rejected",
    className:
      "bg-attendance-grey text-white font-bold rounded px-4 my-2 mr-5 w-32 pointer-events-none",
  },
  [ChangeStatus.UNREGISTER]: {
    text: "Unregister",
    className: "button-base-white px-4 my-2 mr-5 w-32",
  },
};

export const TagButtonStyles: Record<SGATags, TextAndClassNameBuilder> = {
  [SGATags.NEW_SENATORS]: {
    text: "New Senators Fall 2022",
    className: "bg-tag-green rounded-lg px-4 py-1",
  },
  [SGATags.ALL_ACTIVE]: {
    text: "All Active Members",
    className: "bg-tag-blue rounded-lg px-4 py-1",
  },
};
