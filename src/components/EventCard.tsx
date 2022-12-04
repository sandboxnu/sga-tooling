import { ReactElement, useState } from "react";
import MeatballMenuSVG from ".././assets/MeatballMenu.svg";
import PinSVG from ".././assets/Pin.svg";
import TextIconSVG from ".././assets/TextIcon.svg";
import ".././styles.css";
import { EventDate } from "./EventDate";
import EventTag from "./EventTag";

export enum Status {
  Live = "bg-sga-red",
  Today = "bg-black",
  Upcoming = "bg-white",
}

export type Event = {
  startTime: Date;
  endTime: Date;
  name: string;
  location: string;
  description: string;
  status: Status;
  tags: string[];
};

/**
 * Renders a single event in the feed
 */
const EventCard = ({
  startTime,
  endTime,
  name,
  location,
  description,
  status,
  tags,
}: Event): ReactElement => {
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

  let [regStatus, setRegStatus] = useState(true);

  let regButtonStyle = regStatus ? "button-base-white px-2 my-2 mr-5" : "button-base-red px-2 my-2 mr-5";

  const toggleReg = () => {
    setRegStatus(!regStatus);
    // POST API Call Here
  }

  return (
    <>
      <div className="flex my-8 md:my-10">
        <EventDate startTime={startTime} status={status} />
        <div className="flex-1 px-6 md:px-10">
          <span className="font-sans">
            {startTimeString + (endTime ? " to " + endTimeString : "")}
          </span>
          <div className="flex flex-row justify-between items-start mb-4">
            <div className="not-italic font-bold text-2xl leading-8 font-sans break-words w-4/5">
              {name}
            </div>
            <details className="relative">
              <summary className="list-none cursor-pointer">
                <img
                    src={MeatballMenuSVG}
                    alt="Menu svg"
                    aria-label="Open Event Card details"
                  />
              </summary>
              <div className="absolute -ml-40 drop-shadow-[0_12px_12px_rgba(0,0,0,0.4)] rounded-xl bg-white">
                  <ul>
                    <li className="hover:underline pt-3 px-4">Save</li>
                    <li className="hover:underline py-3 px-4">Enable Notifications</li>
                    <li className="hover:underline border-t border-gray-300 border-solid pb-3 pt-2 px-4">Add to Calendar</li>
                  </ul>
              </div>
            </details>
            
          </div>
          <div className="flex flex-row items-start mb-4">
            <img src={PinSVG} alt="Pin svg" className="p-1 pt-0" />
            <span className="text-body-mobile pl-2 pr-12 pt-0.5 font-montserrat break-words w-full">
              {location}
            </span>
          </div>
          <div className="flex flex-row items-start mb-6">
            <img src={TextIconSVG} alt="TextIcon svg" className="p-1 pt-0" />
            <p className="text-body-mobile pl-2 pr-12 font-montserrat break-words w-full">
              {description}
            </p>
          </div>
          <img
            src={MeatballMenuSVG}
            alt="Menu svg"
            aria-label="Open Event Card details"
          />
        </div>
        <div
          className={
            "flex flex-row flex-wrap gap-y-2 gap-x-2 w-full " +
            (tagElements.length > 0 ? "mb-4" : "")
          }
        >
          {tagElements}
        </div>
        <div className="flex flex-row items-start mb-4">
          <img src={PinSVG} alt="Pin svg" className="p-1 pt-0" />
          <span className="text-body-mobile pl-2 pr-8 pt-0.5 font-montserrat break-words w-full md:pr-64">
            {location}
          </span>
        </div>
        <div className="flex flex-row items-start mb-6 md:ml-4 md:mb-0">
          <img src={TextIconSVG} alt="TextIcon svg" className="p-1 pt-0" />
          <p className="text-body-mobile pl-2 pr-8 font-montserrat break-words w-full">
            {description}
          </p>
        </div>
          <div className="flex flex-row flex-wrap">
            {status === Status.Live ? (
              <button className="button-base-red px-4 my-2">Vote</button>
            ) : (
              <>
                <button onClick={toggleReg} className={regButtonStyle}>
                  {regStatus ? "Unregister" : "Register"}
                </button>
                <button className="button-base-red px-4 my-2">See More</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default EventCard;
