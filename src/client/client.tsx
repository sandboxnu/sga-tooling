import { mockEvents } from "../data/events";
import { mockMembers } from "../data/members";
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

export function fetchMember(id: Number): Promise<Member> {
  console.log(id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = mockMembers.find((m) => m.id === id);
      member ? resolve(member) : reject("404 Not found");
    }, 1000);
  });
}
