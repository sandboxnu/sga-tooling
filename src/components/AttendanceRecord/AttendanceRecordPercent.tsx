import { testAttendanceRecord } from "../../util/Types";
import {
  getAllStatuses,
  totalAttendanceCounts,
} from "./AttendanceStatusString";

interface AttendanceRecordPercentagesProps {
  attendanceRecord: testAttendanceRecord[];
}

export const AttendanceRecordPercentages = ({
  attendanceRecord,
}: AttendanceRecordPercentagesProps) => {
  const recordSize = attendanceRecord.length;
  const attendance_statuses = attendanceRecord.map(
    ({ attendance_status }) => attendance_status
  );
  const AttendanceList = getAllStatuses(attendance_statuses);
  const { attended, lateOrEarly, absent } =
    totalAttendanceCounts(AttendanceList);

  const attendedPercent = (attended / recordSize) * 100;
  const earlyOrLatePercent = (lateOrEarly / recordSize) * 100;
  const absentPercent = (absent / recordSize) * 100;

  // we get NaN from divide by 0s if we try to render with no meetings
  if (recordSize === 0) return null;

  return (
    <div className="flex flex-col md:flex-row pt-5">
      <div className="flex items-center gap-2 border border-black md:rounded-l rounded-t md:rounded-tr-none px-1">
        <div className="h-2 w-2 bg-green-600 rounded-full" />
        <span className="font-bold">Attended</span>
        {attendedPercent + "%"}
      </div>
      <div className="flex items-center gap-2 border md:border-l-none border-r-none border-black px-1">
        <div className="h-2 w-2 bg-yellow-400 rounded-full" />
        <span className="font-bold">Late/Left Early</span>
        {earlyOrLatePercent + "%"}
      </div>
      <div className="flex items-center gap-2 border border-black md:rounded-r md:rounded-bl-none rounded-b px-1">
        <div className="h-2 w-2 bg-red-600 rounded-full" />
        <span className="font-bold">Absent</span>
        {absentPercent + "%"}
      </div>
    </div>
  );
};
