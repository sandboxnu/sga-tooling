import { AttendanceRecord } from "../../util/Types";
import {
  getAllStatuses,
  getCountOfKeyInStatusList,
} from "./AttendanceStatusString";

interface AttendanceRecordPercentagesProps {
  attendanceRecord: AttendanceRecord[];
}

export const AttendanceRecordPercentages = ({
  attendanceRecord,
}: AttendanceRecordPercentagesProps) => {
  const recordSize = attendanceRecord.length;
  const attendance_statuses = attendanceRecord.map(
    ({ memberID, eventID, attendance_status }) => attendance_status
  );
  const AttendanceList = getAllStatuses(attendance_statuses);
  const attended = getCountOfKeyInStatusList(AttendanceList, "O");
  const late = getCountOfKeyInStatusList(AttendanceList, "L");
  const early = getCountOfKeyInStatusList(AttendanceList, "D");
  const absentK = getCountOfKeyInStatusList(AttendanceList, "K");
  const absentA = getCountOfKeyInStatusList(AttendanceList, "A");

  const attendedPercent = (attended / recordSize) * 100;
  const earlyOrLatePercent = ((late + early) / recordSize) * 100;
  const absentPercent = ((absentA + absentK) / recordSize) * 100;

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
