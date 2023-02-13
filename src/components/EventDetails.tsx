import { ReactElement } from "react";
import Frame from ".././assets/Frame.svg";
import LinkSVG from ".././assets/Link.svg";
import MeatballMenuSVG from ".././assets/MeatballMenu.svg";
import PinSVG from ".././assets/Pin.svg";
import TextIconSVG from ".././assets/TextIcon.svg";
import { Event } from "./EventCard";

export type EventDetailsProps = {
  event: Event;
};

const EventDetails = ( {event}:EventDetailsProps): ReactElement => {
  return (
    <div
      className="flex h-screen w-screen flex-col p-10"
      style={{ gap: "2rem" }}
    >
      <div className="flex flex-row items-center" style={{ gap: "1rem" }}>
        <img src={Frame} alt="Back arrow" className="p-1 pt-0" />
        <h1 className="section-heading m-0 text-md text-left w-full md:w-2/12">
          <span>EVENT DETAILS</span>
        </h1>
        <img
          src={MeatballMenuSVG}
          alt="Menu svg"
          aria-label="Open Event Card details"
        />
      </div>
      <hr className="border-black home-mx -ml-0 -mr-0" />
      <div className="flex flex-row">
        <div className="font-bold text-2xl leading-8 font-sans break-words">
          {event.name}
        </div>
      </div>
      <div
        className="flex flex-col w-full md:flex-row md:justify-start"
        style={{ gap: "3rem" }}
      >
        <div className="flex flex-row md:w-6/12">
          <div
            className="w-1/2 h-52 bg-no-repeat bg-isec bg-cover margin-0 rounded-l-2xl object-cover md:h-96 md:w-full"
            style={{ gap: 0 }}
          />
          <div className="w-1/2 h-52 bg-sga-red rounded-r-2xl text-white text-right flex  md:w-full flex-col md:pr-5 md:h-96 justify-around md:justify-between p-3">
            <div className="flex flex-col justify-around md:justify-between md:py-4 h-full">
              <div>
                <div className="font-sans font-bold text-5xl">19</div>
                <div className="text-l">
                  <span className="font-sans font-bold">August</span>
                  <span className="font-montserrat pl-1">'22</span>
                  <br />
                  <span className="font-montserrat">Mon</span>
                </div>
              </div>
              <div className="flex flex-col font-sans font-bold text-l md:mt-0">
                8AM - 11AM
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 text-body-mobile font-montserrat gap-y-4">
          <div className="flex flex-row items-start">
            <img src={PinSVG} alt="Location" className="px-3"/>
               <span> {event.location}</span>
          </div>
          <div className="flex flex-row items-start">
            <img src={TextIconSVG} alt="Cool icon" className="px-3"/>
            <span className="break-words">
              {event.description}
            </span>
          </div>

          <div className="flex flex-row items-start">
            <img src={LinkSVG} alt="Link" className="px-3"/>
            kaljfdklajfkaljfakl
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
