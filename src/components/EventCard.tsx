import React from "react";
import { ReactElement } from "react";
import ".././styles.css";
import PinSVG from ".././public/Pin.svg";
import TextIconSVG from ".././public/TextIcon.svg";
import MeatballMenuSVG from ".././public/MeatballMenu.svg";

export interface EventCardProps {
  startTime: Date;
  endTime?: Date;
  name: string;
  location: string;
  description: string;
}

/**
 * Renders a single event in the feed
 */
const EventCard = ({
  startTime,
  endTime,
  name,
  location,
  description,
}: EventCardProps): ReactElement => {
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
    <>
      <div className="pl-4 pt-4 pr-6 w-4/5">
        <span className="font-sans">
          {startTimeString + (endTime ? " to " + endTimeString : "")}
        </span>
        <div className="flex flex-row justify-between items-start mb-4">
          <div className="not-italic font-bold text-2xl leading-8 font-sans break-words w-4/5">
            {name}
          </div>
          <img
            src={MeatballMenuSVG}
            alt="Menu svg"
            aria-label="Open Event Card details"
          />
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

        <div className="flex flex-row flex-wrap">
          <button className="button-base-white px-2 my-2 mr-5"> Unregister </button>
          <button className="button-base-red px-4 my-2">See More</button>
        </div>
      </div>
    </>
  );
};

export default EventCard;
