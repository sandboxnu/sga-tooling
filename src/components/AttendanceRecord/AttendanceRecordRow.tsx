import { Link } from "react-router-dom";
import { createDateString } from "../../util/Date";
import { AttendanceRecord, Event } from "../../util/Types";
import { AttendanceList } from "./AttendanceStatusString";

interface AttendanceRecodRowProps {
  attendanceRecord: AttendanceRecord[];
  event: Event;
}

export const AttendanceRecordRow = ({
  event,
  attendanceRecord,
}: AttendanceRecodRowProps) => {
  const eventStartDate = new Date(event.startTime);
  const eventEndDate = new Date(event.endTime);
  const { month, fulldate, year } = createDateString(eventStartDate);

  const startTimeString = eventStartDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const endTimeString = eventEndDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const correspRecord = attendanceRecord.find(
    (attendance) => attendance.eventID === event.id
  );
  const attendanceStatus = correspRecord!.attendance_status;

  return (
    <tr className="border-b border-gray-600">
      <td className="pt-2">
        <Link to={`/events/${event.id}`} state={{ event }}>
          {event.eventName}
        </Link>
      </td>
      <td className="border-l border-gray-600 px-4 py-2">
        {month + " " + fulldate + ", " + year}
      </td>
      <td className="border-l border-r border-gray-600 px-4 py-2">
        {startTimeString + " - " + endTimeString}
      </td>
      <td className="pl-4">
        <AttendanceList attendanceStatus={attendanceStatus} />
      </td>
    </tr>
  );
};
