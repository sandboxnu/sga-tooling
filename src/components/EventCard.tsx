import { ReactElement } from "react";
import MeatballMenuSVG from ".././assets/MeatballMenu.svg";
import PinSVG from ".././assets/Pin.svg";
import TextIconSVG from ".././assets/TextIcon.svg";
import ".././styles.css";
import { EventDate } from "./EventDate";

export type Event = {
  startTime: Date;
  endTime: Date;
  name: string;
  location: string;
  description: string;
  color: string;
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
  color,
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

  return (
    <div className="flex my-8 md:my-10">
      <EventDate startTime={startTime} color={color} />
      <div className="flex-1 px-6 md:px-10">
        <span className="font-sans">
          {startTimeString + (endTime ? " to " + endTimeString : "")}
        </span>
        <div className="flex flex-row justify-between items-start mb-4 md:mb-2">
          <div className="not-italic font-bold text-2xl leading-8 font-sans break-words w-4/5 md:pr-64">
            {name}
          </div>
          <img
            src={MeatballMenuSVG}
            alt="Menu svg"
            aria-label="Open Event Card details"
          />
        </div>
        <div className="flex flex-row items-start mb-4 md:ml-4 md:mb-2">
          <img src={PinSVG} alt="Pin svg" className="p-1 pt-0" />
          <span className="text-body-mobile pl-2 pr-8 pt-0.5 font-montserrat break-words w-full md:pr-64">
            {location}
          </span>
        </div>
        <div className="flex flex-row items-start mb-6 md:ml-4 md:mb-0">
          <img src={TextIconSVG} alt="TextIcon svg" className="p-1 pt-0" />
          <p className="text-body-mobile pl-2 pr-8 font-montserrat break-words w-full md:pr-64">
            {description}
          </p>
        </div>

        <div className="flex flex-row flex-wrap justify-end md:justify-start md:mt-4">
          {color === "bg-sga-red" ? (
            <button className="button-base-red px-4 my-2 md:px-6">Vote</button>
          ) : (
            <>
              <button className="button-base-white px-2 my-2 mr-5 md:mr-4 md:px-5">
                Unregister
              </button>
              <button className="button-base-red px-4 my-2 md:px-7">
                See More
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
