import { AttendanceRecord } from "../../util/Types";
import {
  getAllStatuses,
  totalAttendanceCounts,
} from "./AttendanceStatusString";

interface AttendanceRecordPercentagesProps {
  attendanceRecord: AttendanceRecord[];
  mobile?: boolean;
}

export const AttendanceRecordPercentages = ({
  attendanceRecord,
  mobile,
}: AttendanceRecordPercentagesProps) => {
  const recordSize = attendanceRecord.length;
  const attendance_statuses = attendanceRecord.map(
    ({ attendance_status }) => attendance_status
  );
  const AttendanceList = getAllStatuses(attendance_statuses);
  const { attended, lateOrEarly, absent } =
    totalAttendanceCounts(AttendanceList);

  const attendedPercent = Math.round((attended / recordSize) * 100);
  const earlyOrLatePercent = Math.round((lateOrEarly / recordSize) * 100);
  const absentPercent = Math.round((absent / recordSize) * 100);

  if (mobile) console.log("mobile:");

  return (
    <div className="flex flex-col md:flex-row pt-5">
      <div
        className={`flex items-center gap-2 border border-black md:rounded-l rounded-t md:rounded-tr-none px-1 py-1 ${
          mobile && "justify-between"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-600 rounded-full" />
          <span className="font-bold">Attended</span>
        </div>
        <span className="px-2">{attendedPercent + "%"}</span>
      </div>
      <div
        className={`flex items-center gap-2 border md:border-l-0 md:border-r-0 border-black px-1 py-1 ${
          mobile && " border-t-0 border-b-0 justify-between"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-yellow-400 rounded-full" />
          <span className="font-bold">Late/Left Early</span>
        </div>
        <span className="px-2">{earlyOrLatePercent + "%"}</span>
      </div>
      <div
        className={`flex items-center gap-2 border border-black md:rounded-r md:rounded-bl-none rounded-b px-1 py-1 ${
          mobile && "justify-between"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-red-600 rounded-full" />
          <span className="font-bold">Absent</span>
        </div>
        <span className="px-2">{absentPercent + "%"}</span>
      </div>
    </div>
  );
};
