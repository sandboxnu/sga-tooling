import { createdAttendanceChange } from "../util/Types";
import { api } from "./client";

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
  const attendance = await api.post(
    "/attendance/postAttendanceChange",
    attendanceChange
  );
  return attendance.data;
};
