import axios from "axios";
import { Event, Member } from "../util/Types";

export const api = axios.create({
  // baseURL: `https://sgatooling-api.vercel.app/api`,
  // baseURL: `https://stage-sgatooling-api.vercel.app/api`,
  baseURL: `http://localhost:3000/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Gets an event with the given id
 * @param id The id of the event being fetched
 * @returns The event if it can be found, or an error
 */
export function fetchEvent(id: number): Promise<Event> {
  return api.get("/event/getEvent", {
    params: {
      id: id,
    },
  });

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     const event = mockEvents.find((e) => e.id === id);
  //     event ? resolve(event) : reject("404 Not found");
  //   }, 1000);
  // });
}

/**
 * Gets all the events
 * @returns An array of events if they can be found, or an error
 */
export function fetchAllEvents(): Promise<Event[]> {
  return api.get("/event/getAllEvents");

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     mockEvents ? resolve(mockEvents) : reject("404 Not found");
  //   }, 1000);
  // });
}

/**
 * Gets the member with the associated nuid
 * @param nuid The nuid of the member
 * @returns The Member with that nuid or undefined
 */
export function fetchMember(nuid: string): Promise<Member | undefined> {
  return api.get("/member/getMember", {
    params: {
      id: nuid,
    },
  });
}
