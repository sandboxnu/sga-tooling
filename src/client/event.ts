import { api } from "./client";

export const getAllEvents = async () => {
  const response = await api.get("/event/getAllEvents");
  return response.data;
};

export const getEvent = async (event_id: string) => {
  const response = await api.get("/event/getEvent", {
    params: {
      id: event_id,
    },
  });

  return response.data;
};

// TODO, implement both frontend and backend for this
export const getEventTags = () => {};