import { Event, EventStatus } from "./Types";

export const getStatus = (event: Event): EventStatus => {
  const now = new Date();
  if (
    event.startTime.getTime() < now.getTime() &&
    now.getTime() < event.endTime.getTime()
  ) {
    return EventStatus.Live;
  }
  return EventStatus.Rest;
};
