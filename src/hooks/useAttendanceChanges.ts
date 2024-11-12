import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AttendanceChange } from "../util/Types";

export default function useAttendanceChanges(
  eventId: string | undefined,
  memberId: string | undefined,
  limit: number | undefined
) {
  return useQuery({
    queryKey: ["attendanceChanges", eventId, memberId, limit],
    queryFn: async (): Promise<AttendanceChange[]> => {
      const response = await axios.get<AttendanceChange[]>(
        `/api/attendance/getAllAttendanceChanges`,
        {
          params: {
            eventId: eventId,
            memberId: memberId,
            limit: limit,
          },
        }
      );

      return response.data;
    },
  });
}
