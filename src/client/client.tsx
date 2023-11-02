import { mockEvents } from "../data/events";
import UserJSON from "../data/users.json";
import { Event, Member } from "../util/Types";

/**
 * Gets an event with the given id
 * @param id The id of the event being fetched
 * @returns The event if it can be found, or an error
 */
export function fetchEvent(id: Number): Promise<Event> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = mockEvents.find((e) => e.id === id);
      event ? resolve(event) : reject("404 Not found");
    }, 1000);
  });
}

/**
 * Gets all the events
 * @returns An array of events if they can be found, or an error
 */
export function fetchAllEvents(): Promise<Event[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      mockEvents ? resolve(mockEvents) : reject("404 Not found");
    }, 1000);
  });
}

/**
 * Gets the member with the associated nuid
 * @param nuid The nuid of the member
 * @returns The Member with that nuid or undefined
 */
export function fetchMember(nuid: string): Promise<Member | undefined> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = (UserJSON as unknown as Member[]).find((m) => m.nuid === nuid);
      console.log("fetchMember", member);
      resolve(member);
    });
  })
}
