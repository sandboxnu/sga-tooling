import { api } from "./login";

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
