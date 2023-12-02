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
  const [requestType, setRequestType] = useState<RequestType | undefined>(
    undefined
  );
  const [lateArrivalTime, setLateArrivalTime] = useState<Date | null>(null);
  const [earlyDepartureTime, setEarlyDepatureTime] = useState<Date | null>(
    null
  );
  const [error, setError] = useState<boolean>(false);

  const depatureTimeEnabled =
    requestType === RequestType.LEAVING_EARLY ||
    requestType === RequestType.BOTH;

  const arrivalTimeEnabled =
    requestType === RequestType.ARRIVING_LATE ||
    requestType === RequestType.BOTH;

  const requestOptionHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    const eventValue: RequestType = event.currentTarget.value as RequestType;
    if (requestType === RequestType.BOTH) {
      if (eventValue === RequestType.ARRIVING_LATE) setEarlyDepatureTime(null);
      if (eventValue === RequestType.LEAVING_EARLY) setLateArrivalTime(null);
    } else if (eventValue !== RequestType.BOTH) {
      setEarlyDepatureTime(null);
      setLateArrivalTime(null);
    }
    setRequestType(eventValue);
  };

  const availableOptions = [
    { value: RequestType.ARRIVING_LATE, label: "Arrive Late" },
    { value: RequestType.LEAVING_EARLY, label: "Leave Early" },
    { value: RequestType.ABSENT, label: "Absent" },
    { value: RequestType.BOTH, label: "Arrive Late and Leave Early" },
  ];

  const validateSubmission = (submission: AttendanceData) => {
    if (!submission.reason || submission.request_type === undefined) {
      return false;
    }
    switch (submission.request_type) {
      case RequestType.ARRIVING_LATE:
        return submission.time_arriving;
      case RequestType.LEAVING_EARLY:
        return submission.time_leaving;
      case RequestType.BOTH:
        return submission.time_arriving && submission.time_leaving;
      default:
        return false;
    }
  };

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

    const isValid = validateSubmission(submissonJson);

    if (isValid) {
      setAttendanceChange(submissonJson);
      onClose();
    } else {
      setError(true);
    }
  };

  const resetFields = () => {
    setReason("");
    setRequestType(undefined);
    setEarlyDepatureTime(null);
    setLateArrivalTime(null);
    setError(false);
    onClose();
  };

  return isOpen ? (
    <div className="fixed top-0 right-0 bottom-0  left-0 m-auto bg-[hsla(0,0%,0%,.5)] h-screen w-screen flex justify-center items-center z-50">
      <div
        className={`flex bg-white rounded-3xl sm:max-w-2xl max-w-sm sm:text-sm text-xs${
          error ? "border-2 border-red-600" : ""
        }`}
      >
        <div>
          <div className="flex flex-col justify-center items-center px-5 pt-3 sm:pl-14 font-montserrat">
            <div className="flex justify-end w-full">
              <XMarkIcon
                onClick={() => resetFields()}
                role="button"
                className="w-8 sm:h-10 sm:w-10 relative"
              />
            </div>
            <span className="font-bold sm:text-2xl text-lg -mt-3">
              Attendance Form
            </span>
            <span className="flex text-center text-xs sm:text-sm py-2">
              SGA members must indicate their attendance for events ahead of
              time and are expected to attend unless an excused reason is
              submitted and approved.
            </span>

            <span className="font-bold text-base text-center py-2">
              Describe reason for filling out form
            </span>

            <form
              onFocus={() => setError(false)}
              onSubmit={(e) => {
                submitForm();
                e.preventDefault();
              }}
            >
              <div className="flex flex-col items-center sm:flex-row gap-2">
                <div className="flex flex-col pr-2 w-full">
                  <label htmlFor="option">Request</label>
                  <select
                    id="option"
                    onChange={requestOptionHandler}
                    className="border border-solid border-black rounded-md py-2"
                  >
                    <option value="" disabled selected>
                      Please choose one option
                    </option>
                    {availableOptions.map((option, index) => {
                      return (
                        <option value={option.value} key={index}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <label
                      htmlFor="arrivalTime"
                      className={` ${
                        arrivalTimeEnabled ? "text-gray-500" : "text-black"
                      }`}
                    >
                      {" "}
                      Arrival Time
                    </label>
                    {arrivalTimeEnabled ? (
                      <input
                        className="rounded-md py-2 w-32 border border-solid border-black"
                        id="arrivalTime"
                        type={"time"}
                        onChange={(e) =>
                          setLateArrivalTime(e.target.valueAsDate)
                        }
                      ></input>
                    ) : (
                      <input
                        className="rounded-md py-2 bg-gray-300 w-32 border border-solid border-black"
                        id="arrivalTime"
                        disabled
                        value=""
                      ></input>
                    )}
                  </div>

                  <div className="w-5 border h-0.5 self-center border-black bg-black mt-4" />

                  <div className="flex flex-col">
                    <label
                      htmlFor="depatureTime"
                      className={` ${
                        depatureTimeEnabled ? "text-gray-500" : "text-black"
                      }`}
                    >
                      {" "}
                      Departure Time{" "}
                    </label>
                    {depatureTimeEnabled ? (
                      <input
                        className="rounded-md py-2 w-32 border border-solid border-black"
                        id="depatureTime"
                        type={"time"}
                        onChange={(e) =>
                          setEarlyDepatureTime(e.target.valueAsDate)
                        }
                      ></input>
                    ) : (
                      <input
                        className="rounded-md py-2 bg-gray-300 w-32  border border-solid border-black"
                        id="depatureTime"
                        disabled
                        value={""}
                      ></input>
                    )}
                  </div>
                </div>
              </div>
              {error && (
                <div className="flex justify-center">
                  <p className={"text-red-600 pt-2 text-center"}>
                    Please input required fields before submission
                  </p>
                </div>
              )}

              <div className="flex flex-col py-2">
                <div>
                  <label htmlFor="Reason">Reason for request</label>
                  {requestType ? (
                    <textarea
                      id="Reason"
                      className="p-2 resize-none border border-solid rounded-md w-full sm:h-40 h-20 border-black"
                      onChange={(e) => setReason(e.target.value)}
                    />
                  ) : (
                    <textarea
                      disabled
                      id="Reason"
                      className="bg-gray-300 resize-none border border-solid rounded-md w-full sm:h-40 h-20  border-black"
                    />
                  )}
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

export default AttendanceChangeModal;
