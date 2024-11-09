import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Event } from "../util/Types";
import { getStatus } from "../util/converters";

export default function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async (): Promise<Event[]> => {
      const response = await axios.get<Event[]>(`/api/event/getAllEvents`);

      const events = response.data
        .map((e): Event => {
          e.startTime = new Date(e.startTime);
          e.endTime = new Date(e.endTime);
          return e;
        })
        .map((e): Event => {
          return {
            ...e,
            status: getStatus(e),
          };
        })
        .sort((a, b) => {
          return (
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
          );
        });
      return events;
    },
  });
}
