import { XMarkIcon } from "@heroicons/react/24/solid";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import ".././styles.css";
import { useAuth } from "../hooks/useAuth";
import useCreateAttendanceChange from "../hooks/useCreateAttendanceChange";
import { RequestType } from "../util/Types";
import Loading from "./Loading";

type AttendanceChangeModalProps = {
  onClose: () => void;
  eventId: string;
};

const AttendanceChangeModal = ({
  onClose,
  eventId,
}: AttendanceChangeModalProps) => {
  const queryClient = useQueryClient();
  const { member } = useAuth();
  const createAttendanceChange = useCreateAttendanceChange(onClose);
  const [reason, setReason] = useState<string>("");
  const [requestType, setRequestType] = useState<RequestType | undefined>(
    undefined
  );
  const [lateArrivalTime, setLateArrivalTime] = useState<Date>();
  const [earlyDepartureTime, setEarlyDepatureTime] = useState<Date>();

  const depatureTimeEnabled =
    requestType === RequestType.LEAVING_EARLY ||
    requestType === RequestType.BOTH;

  const arrivalTimeEnabled =
    requestType === RequestType.ARRIVING_LATE ||
    requestType === RequestType.BOTH;

  const requestOptionHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    const eventValue: RequestType = event.currentTarget.value as RequestType;
    if (requestType === RequestType.BOTH) {
      if (eventValue === RequestType.ARRIVING_LATE)
        setEarlyDepatureTime(undefined);
      if (eventValue === RequestType.LEAVING_EARLY)
        setLateArrivalTime(undefined);
    } else if (eventValue !== RequestType.BOTH) {
      setEarlyDepatureTime(undefined);
      setLateArrivalTime(undefined);
    }
    setRequestType(eventValue);
  };

  const availableOptions = [
    { value: RequestType.ARRIVING_LATE, label: "Arrive Late" },
    { value: RequestType.LEAVING_EARLY, label: "Leave Early" },
    { value: RequestType.ABSENT, label: "Absent" },
    { value: RequestType.BOTH, label: "Arrive Late and Leave Early" },
  ];

  const isFormFilledOut: boolean = (() => {
    if (!reason || !requestType) {
      return false;
    }

    const isArrivingLate =
      requestType === RequestType.ARRIVING_LATE && Boolean(lateArrivalTime);
    const isLeavingEarly =
      requestType === RequestType.LEAVING_EARLY && Boolean(earlyDepartureTime);
    const isAbsent = requestType === RequestType.ABSENT;
    const isBoth =
      requestType === RequestType.BOTH &&
      Boolean(lateArrivalTime) &&
      Boolean(earlyDepartureTime);

    return isArrivingLate || isLeavingEarly || isBoth || isAbsent;
  })();

  const submitForm = async () => {
    if (requestType === undefined || member === undefined) {
      return;
    }
    console.log("Submitting form");
    createAttendanceChange.mutate({
      name: member?.firstName + " " + member?.lastName,
      timeSubmitted: new Date(),
      dateOfChange: new Date(),
      type: requestType,
      reason: reason,
      timeArriving: lateArrivalTime,
      timeLeaving: earlyDepartureTime,
      eventId: eventId,
      memberId: member?.id,
    });
    await queryClient.refetchQueries({
      queryKey: ["attendanceChanges", undefined, member.id, undefined],
    });
    onClose();
  };

  const resetFields = () => {
    setReason("");
    setRequestType(undefined);
    setEarlyDepatureTime(undefined);
    setLateArrivalTime(undefined);
    onClose();
  };

  return (
    <>
      {createAttendanceChange.isPending ? (
        <Loading />
      ) : (
        <div className="fixed top-0 right-0 bottom-0  left-0 m-auto bg-[hsla(0,0%,0%,.5)] h-screen w-screen flex justify-center items-center z-50">
          <div
            className={
              "flex bg-white rounded-3xl sm:max-w-2xl max-w-xs sm:text-sm text-xs"
            }
          >
            <div>
              <div className="flex flex-col justify-center items-center px-5 pt-3 font-montserrat">
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
                <div className="flex flex-col w-4/5">
                  <span className="flex text-center sm:text-base !leading-none text-xxs py-2 font-medium">
                    SGA members must indicate their attendance for events ahead
                    of time and are expected to attend unless an excused reason
                    is submitted and approved.
                  </span>

                  <span className="font-bold text-base text-center py-2 sm:text-lg text-xs">
                    Describe reason for filling out form
                  </span>

                  <form
                    onSubmit={(e) => {
                      submitForm();
                      e.preventDefault();
                    }}
                  >
                    <div className="flex flex-col items-center sm:flex-row gap-2">
                      <div className="flex flex-col w-full">
                        <label htmlFor="option">Request</label>
                        <select
                          id="option"
                          onChange={requestOptionHandler}
                          className="border border-solid border-black rounded-md py-2 sm:mr-2 m-0"
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
                              arrivalTimeEnabled
                                ? "text-gray-500"
                                : "text-black"
                            }`}
                          >
                            {" "}
                            Arrival Time
                          </label>
                          {arrivalTimeEnabled ? (
                            <input
                              className="rounded-md py-2 sm:w-28 w-24 border border-solid border-black"
                              id="arrivalTime"
                              type={"time"}
                              onChange={(e) =>
                                setLateArrivalTime(
                                  e.target.valueAsDate ?? undefined
                                )
                              }
                            ></input>
                          ) : (
                            <input
                              className="rounded-md py-2 bg-gray-300 sm:w-28 w-24 border border-solid border-black"
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
                              depatureTimeEnabled
                                ? "text-gray-500"
                                : "text-black"
                            }`}
                          >
                            {" "}
                            Departure Time{" "}
                          </label>
                          {depatureTimeEnabled ? (
                            <input
                              className="rounded-md py-2 sm:w-28 w-24 border border-solid border-black"
                              id="depatureTime"
                              type={"time"}
                              onChange={(e) =>
                                setEarlyDepatureTime(
                                  e.target.valueAsDate ?? undefined
                                )
                              }
                            ></input>
                          ) : (
                            <input
                              className="rounded-md py-2 bg-gray-300 sm:w-28 w-24  border border-solid border-black"
                              id="depatureTime"
                              disabled
                              value={""}
                            ></input>
                          )}
                        </div>
                      </div>
                    </div>

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
                      <button
                        disabled={!isFormFilledOut}
                        className={`${
                          isFormFilledOut
                            ? "bg-red-500 text-white"
                            : "bg-atn-disabled atn-disabled-text"
                        } text-sm sm:text-lg self-center px-4 mb-2 mt-5 w-32 rounded-md font-sans font-bold py-2`}
                      >
                        {" "}
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AttendanceChangeModal;
