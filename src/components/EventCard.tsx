import React from "react";
import { ReactElement } from "react";
import ".././styles.css";
import PinSVG from ".././public/Pin.svg";
import TextIconSVG from ".././public/TextIcon.svg";
import MeatballMenuSVG from ".././public/MeatballMenu.svg";

export interface EventCardProps {
  time: string;
  name: string;
  location: string;
  description: string;
}

/**
 * Renders a single event in the feed
 *
 * TODO: what's the best way to have events occurring on the same day appear under inside the same date block?
 * TODO: onClick behavior for Register/Registered button (should be able to un-register from event?)
 */
const EventCard = ({
  time,
  name,
  location,
  description,
}: EventCardProps): ReactElement => {
  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/5">placeholder for dates whee</div>
        <div className="pl-4 pt-4 pr-6">
          <span className="font-sans"> {time} </span>
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
            <div className="flex flex-row justify-center items-center border border-solid rounded border-black bg-white not-italic font-bold text-xl h-fit px-4 py-1 m-2 ml-0 font-sans">
              Unregister
            </div>
            <div className="flex flex-row justify-center items-center rounded bg-sgared text-white not-italic font-bold text-xl h-fit px-6 py-1 m-2 mr-0 shadow-md shadow-black/20 font-sans">
              See More
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
