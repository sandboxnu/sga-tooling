import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";
import { createAttendanceChange, fetchMember } from "../client/client";
import {
  AttendanceChange,
  AttendanceData,
  ChangeStatus,
  ListOfButtonClassname,
} from "../util/Types";
import Loading from "./Loading";

interface AttendanceButtonProps {
  openModal: () => void;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorType: React.Dispatch<React.SetStateAction<number>>;
  attendanceChange?: AttendanceChange;
  createdAttendanceChange: AttendanceData | {};
  eventid: number;
}

const createButtonText = (
  initialAttendanceStatus: ChangeStatus | undefined
) => {
  if (initialAttendanceStatus === ChangeStatus.NOT_REVIEWED) {
    return ListOfButtonClassname[0];
  }
  if (initialAttendanceStatus === ChangeStatus.EXCUSED) {
    return ListOfButtonClassname[1];
  }
  if (initialAttendanceStatus === ChangeStatus.UNEXCUSED) {
    return ListOfButtonClassname[2];
  } else {
    return ListOfButtonClassname[3];
  }
};

export const AttendanceButton = ({
  attendanceChange,
  createdAttendanceChange,
  eventid,
  openModal,
  setIsRegistered,
  setErrorType,
}: AttendanceButtonProps) => {
  const { userID } = useContext(LoginContext);
  const [isCreatingAttendance, setIsCreatingAttendance] = useState(false);
  const [initialAttendanceStatus, setAttendanceStatus] = useState(
    attendanceChange?.change_status
  );
  const renderText = createButtonText(initialAttendanceStatus);

  useEffect(() => {
    const makeAttendanceChange = async () => {
      try {
        setIsCreatingAttendance(true);
        //using non-null assertion since it's assumed the user is logged in to make it past the home page
        const member = await fetchMember(userID!);
        if (member) {
          await createAttendanceChange(member.id, eventid);
          setIsRegistered(false);
        }
        setIsCreatingAttendance(false);
        // once we successfully created an AttendanceChange its back to pending
        setAttendanceStatus(ChangeStatus.NOT_REVIEWED);
      } catch (e) {
        setErrorType(1);
        setIsCreatingAttendance(false);
      }
    };
    //on Mount this useEffect starts,
    //so only want this makeAttendanceChange function to start when we actually have something/ this json is not empty
    if (!(Object.keys(createdAttendanceChange).length === 0)) {
      makeAttendanceChange();
    }
  }, [createdAttendanceChange]);

  return (
    <button onClick={openModal} className={`${renderText.className}`}>
      {isCreatingAttendance ? <Loading /> : renderText.text}
    </button>
  );
};
