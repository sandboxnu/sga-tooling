import { AttendanceRecord } from "../../util/Types";
import { getAllStatuses } from "./AttendanceStatusString";

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
  const attendened = AttendanceList.filter((elem) => elem === "O");
  // TODO: these don't consider Excused Absenses/ what not
  const earlyOrLate = AttendanceList.filter(
    (elem) => elem === "L" || elem === "D"
  );
  const absent = AttendanceList.filter((elem) => elem === "K" || elem === "A");

  // TODO: probably should consider how excused etc reflect here
  const attendedPercent = (attendened.length / recordSize) * 100;
  const earlyOrLatePercent = (earlyOrLate.length / recordSize) * 100;
  const absentPercent = (absent.length / recordSize) * 100;

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
