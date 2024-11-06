import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AttendanceRecord } from "../util/Types";
import { getStatus } from "../util/converters";

export default function useAttendanceRecords(id: string | undefined) {
  return useQuery({
    queryKey: ["records", id],
    queryFn: async (): Promise<AttendanceRecord[]> => {
      const response = await axios.get<AttendanceRecord[]>(
        `/api/record/getAttendanceRecordForMember/?id=${id}`
      );

      return response.data.map((r): AttendanceRecord => {
        r.event.startTime = new Date(r.event.startTime);
        r.event.endTime = new Date(r.event.endTime);
        r.event.status = getStatus(r.event);
        return r;
      });
    },
  });
}
