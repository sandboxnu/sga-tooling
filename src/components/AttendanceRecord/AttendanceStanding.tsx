import {
  AttendanceStandingOption,
  AttendanceStandingOptions,
} from "../../util/styleConfig";
import { AttendanceRecord, AttendanceTag, Member } from "../../util/Types";
import {
  getAllStatuses,
  getCountOfKeyInStatusList,
} from "./AttendanceStatusString";

// TODO: why is this optional?
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

  const poorStanding = member?.active_member;
  const pendingDiscussion = member?.sign_in_blocked;

  const amtEvents = attendanceRecord.length;
  const unexcusedA = getCountOfKeyInStatusList(AttendanceList, "A");
  const unexcusedK = getCountOfKeyInStatusList(AttendanceList, "K");
  const absent = unexcusedA + unexcusedK;
  const tooManyAbsent = absent >= 2;
  const excusedAbsences = excusedAbsenceCount(AttendanceList);
  const tooManyExcused =
    ((absent + excusedAbsences) / amtEvents) * 100 > 50 && amtEvents > 4;

  const getStanding = () => {
    if (!poorStanding) {
      return AttendanceStandingOption.REMOVED;
    } else if (pendingDiscussion) {
      return AttendanceStandingOption.ON_HOLD;
    } else if (tooManyExcused || tooManyAbsent) {
      return AttendanceStandingOption.AT_RISK;
    } else {
      return AttendanceStandingOption.GOOD_STANDING;
    }
  };

  const renderText = AttendanceStandingOptions[getStanding()];

  return (
    <span
      className={`${renderText.className} rounded-md font-montserrat font-bold px-4 py-1`}
    >
      {renderText.text}
    </span>
  );
};
