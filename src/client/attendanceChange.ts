import { createdAttendanceChange } from "../util/Types";
import { api } from "./login";

export const getAllAttendanceChangesForMember = async (uuid: string) => {
  const attendance = await api.get("/attendance/getAllAttendanceChanges", {
    params: {
      memberID: uuid,
    },
  });
  return attendance.data;
};

export const createAttendanceChangeRequest = async (
  attendanceChange: createdAttendanceChange
) => {
  console.log(attendanceChange);
  const attendance = await api.post(
    "/attendance/postAttendanceChange",
    attendanceChange
  );

  return attendance.data;
};
