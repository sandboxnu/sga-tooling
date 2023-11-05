import { AttendanceRecord, AttendanceStatus } from "../util/Types";

interface AttendanceRecordPercentagesProps {
  attendanceRecord: AttendanceRecord[];
}

export const AttendanceRecordPercentages = ({
  attendanceRecord,
}: AttendanceRecordPercentagesProps) => {
  const recordSize = attendanceRecord.length;
  const attendened = attendanceRecord.filter(
    (ar) => ar.attendance_status === AttendanceStatus.ATTENDED
  );
  const earlyOrLate = attendanceRecord.filter(
    (ar) =>
      ar.attendance_status === AttendanceStatus.ARRIVED_LATE ||
      ar.attendance_status === AttendanceStatus.LEFT_EARLY
  );
  const absent = attendanceRecord.filter(
    (ar) => ar.attendance_status === AttendanceStatus.ABSENT
  );

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
