import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";
import { createAttendanceChange, fetchMember } from "../client/client";
import { AttendanceButtonStyles } from "../util/styleConfig";
import { AttendanceChange, AttendanceData, ChangeStatus } from "../util/Types";
import Loading from "./Loading";

interface AttendanceButtonProps {
  openModal: () => void;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorType: React.Dispatch<React.SetStateAction<number>>;
  attendanceChange?: AttendanceChange;
  createdAttendanceChange: AttendanceData | {};
  eventid: string;
}

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
    attendanceChange?.change_status || ChangeStatus.UNREGISTER
  );

  useEffect(() => {
    const makeAttendanceChange = async () => {
      try {
        setIsCreatingAttendance(true);
        //using non-null assertion since it's assumed the user is logged in to make it past the home page
        const member = await fetchMember(userID!);
        if (member) {
          await createAttendanceChange(member.id, eventid.toString());
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
  }, [createdAttendanceChange, eventid, setErrorType, setIsRegistered, userID]);

  const renderText = AttendanceButtonStyles[initialAttendanceStatus];

  return (
    <button onClick={openModal} className={`${renderText.className}`}>
      {isCreatingAttendance ? <Loading fullScreen={false} /> : renderText.text}
    </button>
  );
};
