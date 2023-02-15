import EventsJSON from "../data/events.json";
import { Event } from "../util/Types";

export function fetchEvent(id: Number): Promise<Event> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = (EventsJSON as unknown as Event[]).find((e) => e.id === id);
      event ? resolve(event) : reject("404 Not found");
    }, 1000);
  });
}
