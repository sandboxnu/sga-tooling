import { ReactElement } from "react";
import MeatballMenuSVG from ".././public/MeatballMenu.svg";
import PinSVG from ".././public/Pin.svg";
import TextIconSVG from ".././public/TextIcon.svg";
import ".././styles.css";
import { EventDate } from "../EventDate";

export interface EventCardProps {
  startTime: Date;
  endTime?: Date;
  name: string;
  location: string;
  description: string;
  live: boolean;
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
  live,
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
      <div className="flex">
        <EventDate startTime={startTime} live={live} />
        <div className="flex-1 px-6 md:px-8">
          <span className="font-sans md:text-lg">
            {startTimeString + (endTime ? " to " + endTimeString : "")}
          </span>
          <div className="flex flex-row justify-between items-start mb-4">
            <div className="not-italic font-bold text-2xl leading-8 font-sans break-words w-4/5 md:pr-64 md:text-[22px]">
              {name}
            </div>
            <img
              src={MeatballMenuSVG}
              alt="Menu svg"
              aria-label="Open Event Card details"
            />
          </div>
          <div className="flex flex-row items-start mb-4 md:ml-4">
            <img src={PinSVG} alt="Pin svg" className="p-1 pt-0" />
            <span className="text-body-mobile pl-2 pr-8 pt-0.5 font-montserrat break-words w-full md:pr-64 md:text-lg">
              {location}
            </span>
          </div>
          <div className="flex flex-row items-start mb-6 md:ml-4">
            <img src={TextIconSVG} alt="TextIcon svg" className="p-1 pt-0" />
            <p className="text-body-mobile pl-2 pr-8 font-montserrat break-words w-full md:pr-64 md:text-lg">
              {description}
            </p>
          </div>

          <div className="flex flex-row flex-wrap justify-end">
            {live ? (
              <button className="button-base-red px-4 my-2 md:px-6">
                Vote
              </button>
            ) : (
              <>
                <button className="button-base-white px-2 my-2 mr-5 md:mr-10 md:px-5">
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
    </>
  );
};

export default EventCard;
