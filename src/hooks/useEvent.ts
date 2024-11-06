import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Event, EventStatus } from "../util/Types";

export default function useEvent(id: string | undefined) {
  const getStatus = (event: Event): EventStatus => {
    const now = new Date();
    if (
      event.startTime.getTime() < now.getTime() &&
      now.getTime() < event.endTime.getTime()
    ) {
      return EventStatus.Live;
    }
    return EventStatus.Rest;
  };

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
