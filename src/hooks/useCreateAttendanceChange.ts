import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AttendanceChangeCreate } from "../util/Types";

export default function useCreateAttendanceChange(onSuccess: () => any) {
  return useMutation({
    mutationFn: (attendanceChange: AttendanceChangeCreate) => {
      return axios.post(
        "/api/attendance/postAttendanceChange",
        attendanceChange
      );
    },
    onSuccess: onSuccess,
  });
}
