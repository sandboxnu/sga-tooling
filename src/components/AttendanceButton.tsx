import { useContext, useEffect, useState } from "react";
import { LoginContext, queryClient } from "../App";
import { createAttendanceChangeRequest } from "../client/attendanceChange";
import { AttendanceButtonStyles } from "../util/styleConfig";
import {
  AttendanceChange,
  AttendanceData,
  ChangeStatus,
  createdAttendanceChange,
} from "../util/Types";
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
    const makeAttendanceChange = async (
      attendanceChange: createdAttendanceChange
    ) => {
      try {
        setIsCreatingAttendance(true);
        await createAttendanceChangeRequest(attendanceChange);
        setIsCreatingAttendance(false);
        // once we successfully created an AttendanceChange its back to pending
        setAttendanceStatus(ChangeStatus.NOT_REVIEWED);
        // invalidate queries to make attendance change state reload
        queryClient.invalidateQueries({
          queryKey: ["api", "attendance", { userID }],
        });
      } catch (e) {
        setErrorType(1);
        setIsCreatingAttendance(false);
      }
    };
    //on Mount this useEffect starts,
    //so only want this makeAttendanceChange function to start when we actually have something/ this json is not empty
    if (!(Object.keys(createdAttendanceChange).length === 0)) {
      //@ts-ignore
      const combinedAttendance: createdAttendanceChange = {
        ...createdAttendanceChange,
        member_id: userID!,
        event_id: eventid,
      };
      makeAttendanceChange(combinedAttendance);
    }
  }, [createdAttendanceChange, eventid, setErrorType, setIsRegistered, userID]);

  const renderText = AttendanceButtonStyles[initialAttendanceStatus];

  return (
    <button onClick={openModal} className={`${renderText.className}`}>
      {isCreatingAttendance ? <Loading fullScreen={false} /> : renderText.text}
    </button>
  );
};
