import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

type attendanceChangeProps = {
  isOpen: boolean;
  onClose: () => void;
  //TODO: add a type to this :|
  setAttendanceChange: any;
};

const AttendanceChangeModal = ({
  isOpen,
  onClose,
  setAttendanceChange,
}: attendanceChangeProps) => {
  // depending on the attendanceChange (give them the option to update arrive_time/leave_time)

  // I want to use the input values from the user typing in their reason for attendanceCHange, but doing this and updating every onChange
  // seems pretty terrible ...
  const [reason, setReason] = useState("");
  const [requestType, setRequestType] = useState("");
  const [newTime, setNewTime] = useState("");

  const requestOptionHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    setRequestType(event.currentTarget.value);
  };

  const availableOptions = [
    { value: "arrive_late", label: "Arrive Late" },
    { value: "leave_early", label: "Leave Early" },
    { value: "absent", label: "Absent" },
  ];

  const submitForm = () => {
    //update the variables the json
    const submissonJson = {
      reason: reason,
      request_type: requestType,
      submission_time: Date.now(),
    };

    setAttendanceChange({ submissonJson });
    // close the modal
    onClose();
  };

  const resetFields = () => {
    setReason("");
    setRequestType("");
    setNewTime("");
  };

  return isOpen ? (
    <div className="fixed top-0 right-0 bottom-0 left-0 m-auto bg-[hsla(0,0%,0%,.5)] h-screen w-screen flex justify-center items-center z-50">
      <div className="bg-white">
        <div className="border-b border-solid border-black">
          <span>Submit Attendance Form</span>
          <button className="float-right">
            {" "}
            <XMarkIcon onClick={() => onClose()} className="w-5" />{" "}
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
            {requestType === "arrive_late" && (
              <div>
                <label>What will be your new arrival time?</label>
                <input
                  style={{ border: "1px solid" }}
                  type="text"
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </div>
            )}
            {requestType === "leave_early" && (
              <div>
                <label>What will be your new departure time?</label>
                <input
                  style={{ border: "1px solid" }}
                  type="text"
                  onChange={(e) => setNewTime(e.target.value)}
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
