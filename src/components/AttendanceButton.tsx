import { AttendanceChange, ChangeStatus } from "../util/Types";
import { AttendanceButtonStyles } from "../util/styleConfig";

interface AttendanceButtonProps {
  openModal: () => void;
  attendanceChange?: AttendanceChange;
}

export const AttendanceButton = ({
  attendanceChange,
  openModal,
}: AttendanceButtonProps) => {
  const renderText =
    AttendanceButtonStyles[
      attendanceChange?.changeStatus || ChangeStatus.UNREGISTER
    ];

  return (
    <button onClick={openModal} className={`${renderText.className}`}>
      {renderText.text}
    </button>
  );
};
