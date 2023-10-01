import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { AttendanceData, RequestType } from "../util/Types";

type AttendanceChangeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setAttendanceChange: React.Dispatch<React.SetStateAction<AttendanceData>>;
};

const AttendanceChangeModal = ({
  isOpen,
  onClose,
  setAttendanceChange,
}: AttendanceChangeModalProps) => {
  const [reason, setReason] = useState<string>("");
  const [requestType, setRequestType] = useState<RequestType>(
    RequestType.ABSENT
  );
  const [lateArrivalTime, setLateArrivalTime] = useState<Date | null>(null);
  const [earlyDepartureTime, setEarlyDepatureTime] = useState<Date | null>(
    null
  );

  const requestOptionHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    const eventValue: RequestType = event.currentTarget.value as RequestType;
    setRequestType(eventValue);
  };

  const availableOptions = [
    { value: RequestType.ARRIVING_LATE, label: "Arrive Late" },
    { value: RequestType.LEAVING_EARLY, label: "Leave Early" },
    { value: RequestType.ABSENT, label: "Absent" },
  ];

  const submitForm = () => {
    const submissonJson: AttendanceData = {
      reason: reason,
      request_type: requestType,
      submission_time: new Date(),
    };

    if (lateArrivalTime) {
      submissonJson.time_arriving = lateArrivalTime;
    }

    if (earlyDepartureTime) {
      submissonJson.time_leaving = earlyDepartureTime;
    }

    setAttendanceChange(submissonJson);
    onClose();
  };

  const resetFields = () => {
    setReason("");
    setRequestType(RequestType.ABSENT);
    setEarlyDepatureTime(null);
    setLateArrivalTime(null);
    onClose();
  };

  return isOpen ? (
    <div className="fixed top-0 right-0 bottom-0 left-0 m-auto bg-[hsla(0,0%,0%,.5)] h-screen w-screen flex justify-center items-center z-50">
      <div className="bg-white">
        <div className="border-b border-solid border-black">
          <span>Submit Attendance Form</span>
          <button className="float-right">
            {" "}
            <XMarkIcon onClick={() => resetFields()} className="w-5" />{" "}
          </button>
        </div>
        <form onSubmit={submitForm}>
          <div className="flex flex-col justify-center items-center mx-20">
            <select onChange={requestOptionHandler}>
              <option>Please choose one option</option>
              {availableOptions.map((option, index) => {
                return (
                  <option value={option.value} key={index}>
                    {option.label}
                  </option>
                );
              })}
            </select>
            {/* Let Designers Figure out what would be the best way to get a time input */}
            <div>
              <label>Describe Reason for Filling out form</label>
              <input
                style={{ border: "1px solid" }}
                type="text"
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            {requestType === RequestType.ARRIVING_LATE && (
              <div>
                <label>What will be your new arrival time?</label>
                <input
                  style={{ border: "1px solid" }}
                  type="time"
                  onChange={(e) => setLateArrivalTime(e.target.valueAsDate)}
                />
              </div>
            )}
            {requestType === RequestType.LEAVING_EARLY && (
              <div>
                <label>What will be your new departure time?</label>
                <input
                  style={{ border: "1px solid" }}
                  type="time"
                  onChange={(e) => setEarlyDepatureTime(e.target.valueAsDate)}
                />
              </div>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AttendanceChangeModal;
