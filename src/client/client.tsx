import UserJSON from "../data/users.json";
import EventsJSON from "../events.json";
import { Event, Member } from "../util/Types";

export function fetchEvent(id: Number): Promise<Event> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = (EventsJSON as unknown as Event[]).find((e) => e.id === id);
      event ? resolve(event) : reject("404 Not found");
    }, 1000);
  });
}

export function fetchMember(nuid: string): Promise<Member> {
  console.log("in fetch member");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("in promise");
      const member = (UserJSON as unknown as Member[]).find((m) => m.nuid === nuid);
      member ? resolve(member) : reject("404 Not found");
    }, 1000);
  });
}
