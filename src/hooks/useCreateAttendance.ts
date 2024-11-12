import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Attendance } from "../util/Types";

export default function useCreateAttendance() {
  return useMutation({
    mutationFn: (attendance: Attendance) => {
      return axios.post("/api/postAttendance", attendance);
    },
  });
}
