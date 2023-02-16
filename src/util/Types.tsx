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
