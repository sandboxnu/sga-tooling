import { Status } from "../components/EventCard";

export type Event = {
  id: number;
  startTime: Date;
  endTime: Date;
  name: string;
  location: string;
  description: string;
  status: Status;
  tags: string[];
};

export type Member = {
  id: string,
  nuid: string,
  firstName: string,
  lastName: string,
  activeMember: boolean,
  votingRights: boolean,
  receiveNotPresentEmail: boolean,
  includeInQuorum: boolean,
  signInBlocked: boolean
}
