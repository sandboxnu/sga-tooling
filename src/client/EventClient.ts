import axios, { AxiosError } from "axios";
import { Event, Response } from "../util/Types";

export default class EventClient {
  /**
   * Gets an event with the given id
   * @param id The id of the event being fetched
   * @returns The event if it can be found, or an error
   */
  public static async fetchEvent(id: number): Promise<Response<Event>> {
    try {
      const response = await axios.get(`/api/event/getEvent/?id=${id}`);
      return {
        data: response.data,
        error: "",
      };
    } catch (e) {
      if (e instanceof AxiosError) {
        let error: AxiosError<any, any> = e;
        return {
          data: undefined,
          error: error.response?.data,
        };
      }
      throw e;
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
