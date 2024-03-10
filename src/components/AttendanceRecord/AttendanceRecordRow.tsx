import { AttendanceRecord, Event } from "../../util/Types";

interface AttendanceRecodRowProps {
  attendanceRecord: AttendanceRecord[];
  event: Event;
}

export const AttendanceRecordRow = ({
  event,
  attendanceRecord,
}: AttendanceRecodRowProps) => {
  return <></>;
  /*
  const eventStartDate = new Date(event.start_time);
  const eventEndDate = new Date(event.end_time);
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

  // TODO: fix this: for now just making things pass...
  const correspRecord = attendanceRecord.find(
    (attendance) => attendance.eventID === 1
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
        {startTimeString + " - " + endTimeString}
      </td>
      <td className="pl-4">
        <AttendanceList attendanceStatus={attendanceStatus} />
      </td>
    </tr>
  );
  */
};
