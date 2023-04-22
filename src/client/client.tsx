import { mockEvents } from "../data/events";
import UserJSON from "../data/users.json";
import { Event, Member } from "../util/Types";

export function fetchEvent(id: Number): Promise<Event> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = mockEvents.find((e) => e.id === id);
      event ? resolve(event) : reject("404 Not found");
    }, 1000);
  });
}

export function fetchAllEvents(): Promise<Event[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      mockEvents ? resolve(mockEvents) : reject("404 Not found");
    }, 1000);
  });
}

export function fetchMember(nuid: string): Promise<Member | undefined> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = (UserJSON as unknown as Member[]).find((m) => m.nuid === nuid);
      console.log("fetchMember", member);
      resolve(member);
    });
  })
}
