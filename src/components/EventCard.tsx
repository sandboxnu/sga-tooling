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
  let endTimeString: string = endTime
    ? endTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : "";

  return (
    <>
      <div className="pl-4 pt-4 pr-6">
        <span className="font-sans">
          {startTimeString + (endTime ? " to " + endTimeString : "")}
        </span>
        <div className="flex flex-row justify-between items-start mb-4">
          <div className="not-italic font-bold text-2xl leading-8 font-sans">
            {name}
          </div>
          <img src={MeatballMenuSVG} alt="Menu svg" />
        </div>
        <div className="flex flex-row items-start">
          <img src={PinSVG} alt="Pin svg" className="p-1 pt-0" />
          <span className="text-body-mobile pl-2 pr-4 mb-4 font-montserrat">
            {location}
          </span>
        </div>
        <div className="flex flex-row items-start">
          <img src={TextIconSVG} alt="TextIcon svg" className="p-1" />
          <p className="text-body-mobile pl-2 pr-4 mb-6 font-montserrat">
            {" "}
            {description}{" "}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-center items-center border border-solid rounded border-black bg-white not-italic font-bold text-xl h-fit px-2 py-1 my-2 font-sans">
            Unregister
          </div>
          <div className="flex flex-row justify-center items-center rounded bg-sgared text-white not-italic font-bold text-xl h-fit px-5 py-1 my-2 shadow-md shadow-black/20 font-sans">
            See More
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
