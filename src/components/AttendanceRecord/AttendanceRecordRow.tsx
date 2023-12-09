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
  const eventStartDate = new Date(event.start_time);
  const { month, fulldate, year } = createDateString(eventStartDate);

  const startTimeString = eventStartDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const endTimeString = event.end_time
    ? new Date(event.end_time).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : undefined;

  const correspRecord = attendanceRecord.find(
    (attendance) => attendance.event_id === event.uuid
  );
  const attendanceStatus = correspRecord!.attendance_status;

  return (
    <tr className="border-b border-gray-600">
      <td className="pt-2">
        <Link to={`/events/${event.uuid}`} state={{ event }}>
          {event.event_name}
        </Link>
      </td>
      <td className="border-l border-gray-600 px-4 py-2">
        {month + " " + fulldate + ", " + year}
      </td>
      <td className="border-l border-r border-gray-600 px-4 py-2">
        {startTimeString + (event.end_time ? " - " + endTimeString : "")}
      </td>
      <td className="pl-4">
        <AttendanceList attendanceStatus={attendanceStatus} />
      </td>
    </tr>
  );
};
