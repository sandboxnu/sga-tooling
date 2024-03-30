import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { LoginContext } from "../App";
import {
  getAttendanceEventsFromRecord,
  getAttendanceRecord,
} from "../client/attendanceRecord";
import { getMember } from "../client/member";
import { AttendanceRecordPercentages } from "../components/AttendanceRecord/AttendanceRecordPercent";
import { AttendanceRecordRow } from "../components/AttendanceRecord/AttendanceRecordRow";
import { AttendanceStanding } from "../components/AttendanceRecord/AttendanceStanding";
import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/Loading";
import { createDateString } from "../util/Date";
import { AttendanceRecord, Event, Member } from "../util/Types";

/**
 *
 *
 * @returns The page which displays the attendance for each event during the semester.
 */
const AttendanceRecordPage = () => {
  // --- CONTEXT ----------------------------------------------------
  const { userID } = useContext(LoginContext);
  console.log(userID);

  // --- DATA ------------------------------------------------------
  // const [member, setMember] = useState<Member>();
  const {
    data: attendanceRecord,
    isPending: recordLoading,
    isError: recordError,
  } = useQuery<AttendanceRecord[]>({
    queryFn: () => getAttendanceRecord(userID!),
    queryKey: ["api", "record", { userID }],
  });

  const {
    data: attendanceEvents,
    isPending: attendanceEventsLoading,
    isError: attendanceEventsError,
  } = useQuery<Event[]>({
    queryFn: () => getAttendanceEventsFromRecord(userID!),
    queryKey: ["api", "record", "events", { userID }],
  });

  const {
    data: member,
    isPending: memberLoading,
    isError: memberError,
  } = useQuery<Member>({
    queryFn: () => getMember(userID!),
    queryKey: ["api", "member", { userID }],
  });

  // Load until we get back results
  if (attendanceEventsLoading || recordLoading || memberLoading) {
    return <Loading />;
  }

  if (recordError || attendanceEventsError || memberError) {
    return <ErrorComponent />;
  }

  // --- VARIABLES --------------------------------------------------
  const { month, dayOfWeek, fulldate, year } = createDateString(new Date());
  let totalHours = 0;

  for (const event of attendanceEvents) {
    // only count events where we have have a start/end
    if (event.end_time) {
      const endTime = new Date(event.end_time).getTime();
      const startTime = new Date(event.start_time).getTime();
      const timeDifInSeconds = (endTime - startTime) / 1000;
      const timeDiffInHours = Math.round(timeDifInSeconds / 3600);
      totalHours += timeDiffInHours;
    }
  }

  return (
    <div className="flex flex-col p-10 flex-1 h-fit">
      <div className="flex flex-col md:flex-row md:justify-between w-[70vw] md:w-full">
        <div className="flex flex-col justify-between">
          <span className="text-2xl font-bold">ATTENDANCE HISTORY</span>
          <div className="text-xl text-gray-600">
            <div className="hidden md:flex">
              <span className="border-b pb-2 border-gray-600">
                {dayOfWeek + ", " + month + " " + fulldate + ", " + year}{" "}
              </span>
            </div>
            <div className="flex-col md:hidden">
              <span>{member.first_name + " " + member.last_name}</span>
              <div className="w-full border border-t-0 border-gray-600 my-2"></div>
            </div>
          </div>
          <div className="hidden md:block">
            <AttendanceRecordPercentages attendanceRecord={attendanceRecord} />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="hidden md:block text-2xl font-bold">
            {" "}
            {member.first_name + " " + member.last_name}
          </span>
          <div className="py-2 my-3 md:my-1">
            <AttendanceStanding
              member={member}
              attendanceRecord={attendanceRecord}
              className={"py-[0.5em] md:py-1 text-lg md:text-base"}
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

        <div className="block md:hidden">
          <AttendanceRecordPercentages
            attendanceRecord={attendanceRecord}
            mobile={true}
          />
        </div>
      </div>
      <div className="overflow-x-auto max-w-full">
        <table className="text-left w-full mt-12 border-collapse">
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
