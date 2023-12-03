import { useState } from "react";

// TODO: this file is in case we want to split up the logic for the button out of the eventCard to be outside of the component
// I wouldn't mind either, but just a starting point, there's a lot of state being passed in/out though
interface AttendanceButtonProps {
  // openModal: () => void;
  // setIsRegistered, Dispatch
  // setErrorType: Dispatch
  attendanceChange: any; // idk
  createdAttendanceChange: any; // idk
}

export const AttendanceButton = ({
  attendanceChange,
  createdAttendanceChange,
}: AttendanceButtonProps) => {
  const [isCreatingAttendance, setIsCreatingAttendance] = useState(false);

  return <></>;
};
