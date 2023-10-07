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

  const isDepatureTimeDisabled =
    requestType !== RequestType.LEAVING_EARLY &&
    requestType !== RequestType.BOTH;

  const isArrivalTimeDisabled =
    requestType !== RequestType.ARRIVING_LATE &&
    requestType !== RequestType.BOTH;

  const requestOptionHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    const eventValue: RequestType = event.currentTarget.value as RequestType;
    setRequestType(eventValue);
  };

  const availableOptions = [
    { value: RequestType.ARRIVING_LATE, label: "Arrive Late" },
    { value: RequestType.LEAVING_EARLY, label: "Leave Early" },
    { value: RequestType.ABSENT, label: "Absent" },
    { value: RequestType.BOTH, label: "Arrive Late and Leave Early" },
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

  //TODO: on change to a disabled input, if you input something in the first input, it will remain in the other input
  const isTesting = false;

  if (isTesting) {
    return isOpen ? (
      <div className="fixed top-0 right-0 bottom-0  left-0 m-auto bg-[hsla(0,0%,0%,.5)] h-screen w-screen flex justify-center items-center z-50">
        <div className="flex items-center flex-col h-2/4 w-2/4 my-2.5 bg-white text-2xl font-semibold rounded-lg px-4 py-4">
          Hello there
        </div>
      </div>
    ) : (
      <></>
    );
  }

  return isOpen ? (
    <div className="fixed top-0 right-0 bottom-0  left-0 m-auto bg-[hsla(0,0%,0%,.5)] h-screen w-screen flex justify-center items-center z-50">
      <div className="flex bg-white rounded-3xl max-w-2xl">
        <div>
          <XMarkIcon
            onClick={() => resetFields()}
            role="button"
            className="h-10 w-10 float-right mt-4 mr-4"
          />
          <div className="flex flex-col justify-center items-center pl-14 pt-16 font-montserrat gap-4">
            <span className="font-bold text-2xl">Attendance Form</span>
            <span className="flex text-center">
              SGA members must indicate their attendance for events ahead of
              time and are expected to attend unless an excused reason is
              submitted and approved.
            </span>

            <span className="font-bold text-base">
              Describe reason for filling out form
            </span>

            <form onSubmit={() => submitForm()}>
              <div className="flex flex-col items-center md:flex-row gap-2">
                <div className="flex flex-col pr-2">
                  <label htmlFor="option">Request</label>
                  <select
                    id="option"
                    onChange={requestOptionHandler}
                    className="border border-solid border-black rounded-md py-2"
                  >
                    <option>Please choose one option</option>
                    {availableOptions.map((option, index) => {
                      return (
                        <option value={option.value} key={index}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="arrivalTime"> Arrival Time</label>
                  {!isArrivalTimeDisabled ? (
                    <input
                      className="rounded-md py-2 w-32 border border-solid border-black"
                      id="arrivalTime"
                      type={"time"}
                    ></input>
                  ) : (
                    <input
                      className="rounded-md py-2 bg-gray-300 w-32 border border-solid border-black"
                      id="arrivalTime"
                      disabled
                    ></input>
                  )}
                </div>

                <div className="w-5 border h-0.5 self-center border-black bg-black mt-4" />

                <div className="flex flex-col">
                  <label htmlFor="depatureTime"> Departure Time </label>
                  {!isDepatureTimeDisabled ? (
                    <input
                      className="rounded-md py-2 w-32 border border-solid border-black"
                      id="depatureTime"
                      type={"time"}
                    ></input>
                  ) : (
                    <input
                      className="rounded-md py-2 bg-gray-300 w-32  border border-solid border-black"
                      id="depatureTime"
                      disabled
                    ></input>
                  )}
                </div>
              </div>

              <div className="flex flex-col py-2">
                <div>
                  <label htmlFor="Reason"> Reason for request</label>
                  <textarea
                    id="Reason"
                    className="resize-none border border-solid rounded-md w-full h-40 border-black"
                  ></textarea>
                </div>
                <button className="text-white self-center button-base-red px-4 my-2 w-32 rounded-md font-sans font-bold py-2">
                  {" "}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

/*
bg-white rounded-3xl max-w-2xl
*/
export default AttendanceChangeModal;
