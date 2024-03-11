import axios from "axios";
import { createdAttendanceChange } from "../util/Types";
import { api } from "./login";

export const api2 = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const getAllAttendanceChangesForMember = async (uuid: string) => {
  const attendance = await api.get("/attendance/getAllAttendanceChanges", {
    params: {
      memberID: uuid,
    },
  });
  return attendance.data;
};

// TODO: need to not get blocked by CORS
export const createAttendanceChangeRequest = async (
  attendanceChange: createdAttendanceChange
) => {
  console.log(attendanceChange);
  const attendance = await api2.post(
    "/attendance/postAttendanceChange",
    attendanceChange
  );

  return attendance.data;
};
