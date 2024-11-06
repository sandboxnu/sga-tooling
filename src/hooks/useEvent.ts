import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Event } from "../util/Types";
import { getStatus } from "../util/converters";

export default function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async (): Promise<Event> => {
      if (!id) {
        throw new Error("No id provided");
      }
      const response = await axios.get<Event>(`/api/event/getEvent/?id=${id}`);

      const event = response.data;
      event.startTime = new Date(event.startTime);
      event.endTime = new Date(event.endTime);
      event.status = getStatus(event);

      return event;
    },
  });
}
