import { useContext, useEffect, useState } from "react";
import { createAttendanceChange } from "../client/client";
import { AuthContext } from "../hooks/useAuth";
import { AttendanceChange, AttendanceData, ChangeStatus } from "../util/Types";
import { AttendanceButtonStyles } from "../util/styleConfig";
import Loading from "./Loading";

interface AttendanceButtonProps {
  openModal: () => void;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorType: React.Dispatch<React.SetStateAction<number>>;
  attendanceChange?: AttendanceChange;
  createdAttendanceChange: AttendanceData | {};
  eventid: number;
}

export const AttendanceButton = ({
  attendanceChange,
  createdAttendanceChange,
  eventid,
  openModal,
  setIsRegistered,
  setErrorType,
}: AttendanceButtonProps) => {
  const { member } = useContext(AuthContext);
  const [isCreatingAttendance, setIsCreatingAttendance] = useState(false);
  const [initialAttendanceStatus, setAttendanceStatus] = useState(
    attendanceChange?.change_status || ChangeStatus.UNREGISTER
  );

  useEffect(() => {
    const makeAttendanceChange = async () => {
      try {
        setIsCreatingAttendance(true);
        //using non-null assertion since it's assumed the user is logged in to make it past the home page
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
  }, [member, createdAttendanceChange, eventid, setErrorType, setIsRegistered]);

  const renderText = AttendanceButtonStyles[initialAttendanceStatus];

  return (
    <button onClick={openModal} className={`${renderText.className}`}>
      {isCreatingAttendance ? <Loading fullScreen={false} /> : renderText.text}
    </button>
  );
};
