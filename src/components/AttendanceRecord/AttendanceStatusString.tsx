import { AttendanceTag, KeyToTextDict } from "../../util/Types";

// this function takes in the coming list of characters and groups according strings when there is
// an Excused Tag(E) or Not Requried Tag (N)
export const preProcess = (attendanceStatus: string): AttendanceTag[][] => {
  const splitChars = attendanceStatus.split("");
  const returnArray = [];

  for (let i = 0; i < splitChars.length; i++) {
    const currChar = splitChars[i] as AttendanceTag;
    const nextChar = splitChars[i + 1] as AttendanceTag;
    if (nextChar === "E") {
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

interface AttendanceListProps {
  attendanceStatus: string;
}
export const AttendanceList = ({ attendanceStatus }: AttendanceListProps) => {
  const keyToTextDict: KeyToTextDict = {
    K: "Absent",
    A: "Absent",
    L: "Late Arrival",
    D: "Early Dismissal",
    O: "Attendend",
    N: "Not Required ",
    E: "Excused ",
  };

  const keyToClassName: KeyToTextDict = {
    L: "bg-attendance-yellow border border-attendance-yellow bg-opacity-25",
    D: "bg-attendance-yellow border border-attendance-yellow bg-opacity-25",
    O: "bg-attendance-green border border-attendance-green bg-opacity-25",
    A: "bg-attendance-red border border-attendance-red bg-opacity-25",
    K: "bg-attendance-red border border-attendance-red bg-opacity-25",
    E: "bg-attendance-grey border border-attendance-grey bg-opacity-25",
    N: "bg-attendance-grey border border-attendance-grey bg-opacity-25",
  };

  const listOfTags = preProcess(attendanceStatus);
  const listOfTextAndColors = listOfTags.map((tag) => {
    let combinedString = "";
    let color;
    for (const arrTag of tag) {
      combinedString += keyToTextDict[arrTag];
      if (!color) {
        color = keyToClassName[arrTag];
      }
    }
    return [combinedString, color];
  });

  return (
    <div className="flex flex-wrap gap-1">
      {listOfTextAndColors.map((tuple) => {
        return (
          <span className={`${tuple[1]} rounded-md px-2 py-1`}>{tuple[0]}</span>
        );
      })}
    </div>
  );
};
