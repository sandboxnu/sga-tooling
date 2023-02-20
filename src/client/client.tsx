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

export function fetchMember(id: Number): Promise<Member> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = mockMembers.find((m) => m.id === id);
      member ? resolve(member) : reject("404 Not found");
    }, 1000);
  });
}

// TODO
// 1. change the mock data to be ts files NOT json, look into why it's being annoying
// 2. add more mock data and helpers to match the database

// 3. add them where appropriate (i.e. events was in the events page)
// 4. add loading to those pages as well like st-26
