import {
  AttendanceTagToClassName,
  AttendanceTagToText,
} from "../../util/styleConfig";
import { AttendanceTag } from "../../util/Types";

// this function takes in the coming list of characters and groups according strings when there is
// an Excused Tag(E) or Not Requried Tag (N)
export const preProcess = (attendanceStatus: string): AttendanceTag[][] => {
  const splitChars = attendanceStatus.split("");
  const returnArray = [];

  for (let i = 0; i < splitChars.length; i++) {
    const currChar = splitChars[i] as AttendanceTag;
    const nextChar = splitChars[i + 1] as AttendanceTag;
    if (nextChar === "E" || nextChar === "N") {
      const elemItem = [nextChar, currChar];
      returnArray.push(elemItem);
      // remove the next char since its joined in the same array
      splitChars.splice(i + 1, 1);
    } else {
      returnArray.push([currChar as AttendanceTag]);
    }
  }

  return returnArray;
};

export const getAllStatuses = (attendance_statuses: string[]) => {
  const returnArray: AttendanceTag[][] = [];
  for (const attendance of attendance_statuses) {
    const allLetters = preProcess(attendance);
    for (const arrElem of allLetters) {
      returnArray.push(arrElem);
    }
  }
  return returnArray;
};

export const getCountOfKeyInStatusList = (
  attendanceTagList: AttendanceTag[][],
  key: string
) => {
  let count = 0;
  for (const arrElem of attendanceTagList) {
    if (arrElem.length === 1) {
      if (arrElem[0] === key) {
        count++;
      }
    }
  }
  return count;
};

export const totalAttendanceCounts = (attendanceTagList: AttendanceTag[][]) => {
  const attended = getCountOfKeyInStatusList(attendanceTagList, "O");
  const late = getCountOfKeyInStatusList(attendanceTagList, "L");
  const early = getCountOfKeyInStatusList(attendanceTagList, "D");
  const absentK = getCountOfKeyInStatusList(attendanceTagList, "K");
  const absentA = getCountOfKeyInStatusList(attendanceTagList, "A");

  const lateOrEarly = late + early;
  const absent = absentA + absentK;

  return {
    attended,
    lateOrEarly,
    absent,
  };
};

interface AttendanceListProps {
  attendanceStatus: string;
}
export const AttendanceList = ({ attendanceStatus }: AttendanceListProps) => {
  const listOfTags = preProcess(attendanceStatus);
  const listOfTextAndColors = listOfTags.map((tag) => {
    let combinedString = "";
    let color;
    for (const arrTag of tag) {
      combinedString += AttendanceTagToText[arrTag];
      if (!color) {
        color = AttendanceTagToClassName[arrTag];
      }
    }
    return [combinedString, color];
  });

  return (
    <div className="flex flex-wrap">
      {listOfTextAndColors.map((tuple) => {
        return (
          <span className={`${tuple[1]} rounded-md px-2 py-1 m-1`}>
            {tuple[0]}
          </span>
        );
      })}
    </div>
  );
};
