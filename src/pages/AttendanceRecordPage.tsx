import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";
import { getMember } from "../client/member";
import {
  getAttendanceEventsFromRecord,
  getAttendanceRecord,
} from "../client/record";
import { AttendanceRecordPercentages } from "../components/AttendanceRecord/AttendanceRecordPercent";
import { AttendanceRecordRow } from "../components/AttendanceRecord/AttendanceRecordRow";
import { AttendanceStanding } from "../components/AttendanceRecord/AttendanceStanding";
import Loading from "../components/Loading";
import { createDateString } from "../util/Date";
import { AttendanceRecord, Event, Member } from "../util/Types";

const AttendanceRecordPage = () => {
  const [member, setMember] = useState<Member>();
  const [attendanceRecord, setAttendanceRecord] = useState<
    AttendanceRecord[] | []
  >([]);
  const [attendanceEvents, setAttendanceEvents] = useState<Event[] | []>();
  const { userID } = useContext(LoginContext);
  const { month, dayOfWeek, fulldate, year } = createDateString(new Date());
  let totalHours = 0;

  useEffect(() => {
    const fetchMemberRecord = async () => {
      // TODO: this still feels too slow tbh for fetching all these together,
      try {
        const memberData = await getMember(userID!);
        setMember(memberData.member);
        const attendanceRecords = await getAttendanceRecord(userID!);
        setAttendanceRecord(attendanceRecords.record);
        const attendanceEvents = await getAttendanceEventsFromRecord(userID!);
        setAttendanceEvents(attendanceEvents.events);
      } catch (err) {
        // TODO: have some erorr handling
      }
    };

    fetchMemberRecord();
  }, [userID]);

  if (!attendanceEvents) return <Loading />;

  for (const event of attendanceEvents) {
    if (event.end_time) {
      const endTime = new Date(event.end_time).getTime();
      const startTime = new Date(event.start_time).getTime();
      const timeDifInSeconds = (endTime - startTime) / 1000;
      const timeDiffInHours = Math.round(timeDifInSeconds / 3600);
      totalHours += timeDiffInHours;
    }
  }

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
            {member?.first_name + " " + member?.last_name}
          </span>
          <div className="py-2">
            <AttendanceStanding
              member={member}
              attendanceRecord={attendanceRecord}
            />
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
            {attendanceEvents.map((event) => (
              <AttendanceRecordRow
                attendanceRecord={attendanceRecord}
                event={event}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceRecordPage;
