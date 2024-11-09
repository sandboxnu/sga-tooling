import axios from "axios";
import { Event, Response } from "../util/Types";

export default class EventClient {
  /**
   * Gets an event with the given id
   * @param id The id of the event being fetched
   * @returns The event if it can be found, or an error
   */
  public static async fetchEvent(id: number): Promise<Response<Event>> {
    const response = await axios.get(`/api/event/getEvent/?id=${id}`);
    if (response.status === 200) {
      return {
        data: response.data,
        error: "",
      };
    } else {
      return {
        data: undefined,
        error: response.data,
      };
    }
  }

  /**
   * Gets all the events
   * @returns An array of events if they can be found, or an error
   */
  public static async fetchAllEvents(): Promise<Response<Event[]>> {
    const response = await axios.get(`/api/event/getAllEvents`);
    return response;
  }
}
