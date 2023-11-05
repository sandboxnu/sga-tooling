import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";
import {
  fetchEvent,
  fetchMember,
  getAttendanceRecordForMember,
} from "../client/client";
import { AttendanceRecordPercentages } from "../components/AttendanceRecordPercent";
import { createDateString } from "../util/Date";
import {
  AttendanceRecord,
  AttendanceStatus,
  Event,
  Member,
} from "../util/Types";

const AttendanceRecordPage = () => {
  const [member, setMember] = useState<Member>();
  const [attendanceRecord, setAttendanceRecord] = useState<
    AttendanceRecord[] | []
  >([]);
  const [attendanceEvents, setAttendanceEvents] = useState<Event[] | []>([]);
  const { userID } = useContext(LoginContext);
  const { month, dayOfWeek, fulldate, year } = createDateString(new Date());
  let totalHours = 0;
  useEffect(() => {
    const fetchMemberRecord = async () => {
      const member = await fetchMember(userID!);
      setMember(member);
      const attendanceRecords = await getAttendanceRecordForMember(member!.id);
      setAttendanceRecord(attendanceRecords);
      const events: Event[] = [];
      for (const record of attendanceRecords) {
        const event = await fetchEvent(record.eventID);
        events.push(event);
      }
      setAttendanceEvents(events);
    };
    fetchMemberRecord();
  }, []);

  for (const event of attendanceEvents) {
    const endTime = new Date(event.endTime).getTime();
    const startTime = new Date(event.startTime).getTime();
    const timeDifInSeconds = (endTime - startTime) / 1000;
    const timeDiffInHours = Math.round(timeDifInSeconds / 3600);
    totalHours += timeDiffInHours;
  }

  // TODO: This takes some time to fetch the all the data and create the graph, would like there to be a loading state
  // also test if this is taking too long
  return (
    <div className="flex flex-col p-10 flex-1">
      <div className="flex justify-between">
        <div className="flex flex-col justify-between">
          <div className="">
            <span className="text-2xl font-bold">ATTENDANCE HISTORY</span>
            <div className="text-xl text-gray-600">
              <span className="border-b pb-2 border-gray-600">
                {dayOfWeek + ", " + month + " " + fulldate + ", " + year}{" "}
              </span>
            </div>
          </div>
          <AttendanceRecordPercentages attendanceRecord={attendanceRecord} />
        </div>

        <div className="flex flex-col">
          <span className="text-2xl font-bold">
            {" "}
            {member?.firstName + " " + member?.lastName}
          </span>
          <div className="py-2">
            <span className="bg-attendance-green text-attendance-text-green bg-opacity-25 px-4 py-1 rounded-md font-montserrat font-bold border border-attendance-green">
              {" "}
              Good standing{" "}
            </span>
          </div>
          <div className="flex gap-x-12">
            <div className="flex flex-col">
              <span className="font-montserrat font-medium">
                Total attendance
              </span>
              <span className="text-xl font-bold">
                {attendanceRecord.length + " Meetings"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat font-medium">Total Hours</span>
              <span className="text-xl font-bold">{totalHours}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table className="text-left w-full mt-12">
          <thead>
            <tr className="text-xl text-gray-600 border-t border-b border-gray-600">
              <th className="font-normal py-2 w-3/12">Event Name</th>
              <th className="font-normal border-l border-gray-600 px-4 py-2 w-2/12">
                Date
              </th>
              <th className="font-normal border-l border-r border-gray-600 px-4 py-2 w-4/12">
                Time
              </th>
              <th className="font-normal pl-4 w-3/12">Your Status</th>
            </tr>
          </thead>
          <tbody>
            {/*TODO: export this out to another helper method */}
            {attendanceEvents.map((event) => {
              const eventStartDate = new Date(event.startTime);
              const eventEndDate = new Date(event.endTime);
              const { month, fulldate, year } =
                createDateString(eventStartDate);

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

              const createBackGroundColor = (status: AttendanceStatus) => {
                if (status === AttendanceStatus.ABSENT) {
                  return "bg-attendance-red border border-attendance-red bg-opacity-25";
                } else if (
                  status === AttendanceStatus.ARRIVED_LATE ||
                  status === AttendanceStatus.LEFT_EARLY
                ) {
                  return "bg-attendance-yellow border border-attendance-yellow bg-opacity-25";
                } else {
                  return "bg-attendance-green border border-attendance-green bg-opacity-25";
                }
              };
              const bgColor = createBackGroundColor(attendanceStatus);

              // TODO: handle the case when we need a range of dates for now just startTime
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
                    {" "}
                    <span className={`${bgColor} rounded-md px-2 py-1`}>
                      {attendanceStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceRecordPage;
