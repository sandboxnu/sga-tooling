import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import MeatballMenuSVG from ".././assets/MeatballMenu.svg";
import PinSVG from ".././assets/Pin.svg";
import TextIconSVG from ".././assets/TextIcon.svg";
import ".././styles.css";
import TriangleError from "../assets/TriangleError.svg";
import { AttendanceChange, Event, EventStatus } from "../util/Types";
import { AttendanceButton } from "./AttendanceButton";
import AttendanceChangeModal from "./AttendanceChangeModal";
import { EventDate } from "./EventDate";
import EventTag from "./EventTag";
import PopUp from "./PopUp";

interface EventCardProps {
  event: Event;
  attendanceChange?: AttendanceChange;
}
/**
 * Renders a single event in the feed
 */
const EventCard = ({
  event,
  attendanceChange,
}: EventCardProps): ReactElement => {
  const {
    id,
    startTime,
    endTime,
    eventName,
    location,
    description,
    status,
    tags,
  } = event;

  let startTimeString: string = startTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let endTimeString: string | undefined = endTime
    ? endTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : undefined;

  const tagElements: ReactElement[] = tags
    ? tags.map((t) => {
        return <EventTag tag={t} />;
      })
    : [];

  const [isRegistered, setIsRegistered] = useState(
    attendanceChange ? false : true
  );
  const [errorType, setErrorType] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [createdAttendanceChange, setCreatedAttendanceChange] = useState({});

  const openModal = () => {
    if (isRegistered) {
      setIsOpen(true);
      document.body.classList.add("disable-scrolling");
    } else {
      setIsOpen(false);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("disable-scrolling");
  };

  return (
    <>
      {errorType === 1 ? (
        <PopUp
          source={TriangleError}
          message1="There was an internal server error which caused this failure"
          useState={setErrorType}
        />
      ) : null}
      <div className="flex my-8 md:my-10">
        <EventDate startTime={startTime} status={status} />
        <div className="flex-1 px-6 md:px-10">
          <span className="font-sans">
            {startTimeString + (endTime ? " to " + endTimeString : "")}
          </span>
          <div className="flex flex-row justify-between items-start mb-4">
            <div className="not-italic font-bold text-2xl leading-8 font-sans break-words w-4/5">
              {eventName}
            </div>
            <details className="relative">
              <summary className="list-none cursor-pointer">
                <img
                  src={MeatballMenuSVG}
                  alt="Menu svg"
                  aria-label="Open Event Card details"
                />
              </summary>
              <div className="absolute -ml-40 drop-shadow-event-dropdown rounded-xl bg-white">
                <ul>
                  <li className="hover:underline pt-3 px-4">Save</li>
                  <li className="hover:underline py-3 px-4">
                    Enable Notifications
                  </li>
                  <li className="hover:underline border-t border-gray-300 border-solid pb-3 pt-2 px-4">
                    Add to Calendar
                  </li>
                </ul>
              </div>
            </details>
          </div>
          <div
            className={
              "flex flex-row flex-wrap gap-y-2 gap-x-2 w-full " +
              (tagElements.length > 0 ? "mb-4" : "")
            }
          >
            {tagElements}
          </div>
          <div className="flex flex-row items-start mb-4 md:ml-4">
            <img src={PinSVG} alt="Pin svg" className="p-1 pt-0" />
            <span className="text-body-mobile pl-2 pr-8 pt-0.5 font-montserrat break-words w-full md:pr-64">
              {location}
            </span>
          </div>
          <div className="flex flex-row items-start mb-6 md:ml-4">
            <img src={TextIconSVG} alt="TextIcon svg" className="p-1 pt-0" />
            <p className="text-body-mobile pl-2 pr-8 font-montserrat break-words w-full">
              {description}
            </p>
          </div>

          <div className="flex flex-row flex-wrap">
            {status === EventStatus.Live ? (
              <button
                className="button-base-disabled px-4 my-2"
                disabled={true}
              >
                Vote
              </button>
            ) : (
              <>
                <AttendanceButton
                  openModal={openModal}
                  setIsRegistered={setIsRegistered}
                  setErrorType={setErrorType}
                  eventid={id}
                  attendanceChange={attendanceChange}
                  createdAttendanceChange={createdAttendanceChange}
                />
                <Link to={`/events/${id}`} state={{ event }}>
                  <button className="button-base-red px-4 my-2 w-32">
                    See More
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <AttendanceChangeModal
          isOpen={isOpen}
          onClose={() => closeModal()}
          setAttendanceChange={setCreatedAttendanceChange}
        />
      </div>
    </>
  );
};

export default EventCard;
