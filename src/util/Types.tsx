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

export enum EventStatus {
  Live = "bg-sga-red",
  First = "bg-black",
  Rest = "bg-white",
}
