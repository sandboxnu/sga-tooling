import {
  AttendanceRecord,
  AttendanceStandingOptions,
  AttendanceTag,
  Member,
} from "../../util/Types";
import {
  getAllStatuses,
  getCountOfKeyInStatusList,
} from "./AttendanceStatusString";

interface AttendaceStandingProps {
  member?: Member;
  attendanceRecord: AttendanceRecord[];
}

const excusedAbsenceCount = (attendanceStatusses: AttendanceTag[][]) => {
  let count = 0;
  for (const attendanceStatus of attendanceStatusses) {
    if (attendanceStatus.length === 2) {
      if (
        attendanceStatus[0] === "E" &&
        (attendanceStatus[1] === "A" || attendanceStatus[1] === "K")
      ) {
        count++;
      }
    }
  }
  return count;
};

export const AttendanceStanding = ({
  member,
  attendanceRecord,
}: AttendaceStandingProps) => {
  const attendance_statuses = attendanceRecord.map(
    ({ attendance_status }) => attendance_status
  );
  const AttendanceList = getAllStatuses(attendance_statuses);

  const poorStanding = member?.activeMember;
  const pendingDiscussion = member?.signInBlocked;

  const amtEvents = attendanceRecord.length;
  const unexcusedA = getCountOfKeyInStatusList(AttendanceList, "A");
  const unexcusedK = getCountOfKeyInStatusList(AttendanceList, "K");
  const absent = unexcusedA + unexcusedK;
  const tooManyAbsent = absent >= 2;
  const excusedAbsences = excusedAbsenceCount(AttendanceList);
  const tooManyExcused =
    ((absent + excusedAbsences) / amtEvents) * 100 > 50 && amtEvents > 4;

  const createStrings = () => {
    if (!poorStanding) {
      return AttendanceStandingOptions[0];
    } else if (pendingDiscussion) {
      return AttendanceStandingOptions[1];
    } else if (tooManyExcused || tooManyAbsent) {
      return AttendanceStandingOptions[2];
    } else {
      return AttendanceStandingOptions[3];
    }
  };

  const renderText = createStrings();

  return (
    <span
      className={`${renderText.className} rounded-md font-montserrat font-bold px-4 py-1`}
    >
      {renderText.text}
    </span>
  );
};
