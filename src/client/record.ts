import { api } from "./client";

export const getAttendanceRecord = async (memberID: string) => {
  const response = await api.get("/record/getAttendanceRecord", {
    params: {
      id: memberID,
    },
  });

  return response.data;
};

export const getAttendanceEventsFromRecord = async (memberID: string) => {
  const response = await api.get("/record/getAttendanceEvents", {
    params: {
      id: memberID,
    },
  });

  return response.data;
};
