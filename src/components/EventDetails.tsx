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

//Displays detailed information about event.
const EventDetails = ({ event }: EventDetailsProps): ReactElement => {
  let startTimeString: string = event.startTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let endTimeString: string | undefined = event.endTime
    ? event.endTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : undefined;

  return (
    <div className="flex flex-1 flex-col p-10 gap-8">
      <div className="flex flex-row items-center gap-4">
        <img src={Frame} alt="Back arrow" />
        <h1 className="section-heading m-0 text-md text-left flex-1 md:flex-0">
          <span>EVENT DETAILS</span>
        </h1>
        <img
          src={MeatballMenuSVG}
          alt="Menu svg"
          aria-label="Open Event Card details"
        />
      </div>
      <hr className="border-black" />
      <div className="font-bold text-2xl leading-8 font-sans break-words">
        {event.name}
      </div>
      <div className="flex flex-col w-full md:flex-row gap-12">
        <div className="flex flex-row h-60 md:w-6/12 md:h-96">
          <div className="flex-1 bg-no-repeat bg-isec bg-cover rounded-l-2xl object-cover" />
          <div className="flex-1 bg-sga-red rounded-r-2xl text-white text-right p-4">
            <div className="flex flex-col justify-around md:justify-between h-full">
              <div>
                <div className="font-sans font-bold text-5xl">
                  {event.startTime.toLocaleDateString("en-US", {
                    day: "numeric",
                  })}
                </div>
                <div className="text-l">
                  <span className="font-sans font-bold">
                    {event.startTime.toLocaleDateString("en-US", {
                      month: "long",
                    })}
                  </span>
                  <span className="font-montserrat pl-1">
                    '
                    {event.startTime.toLocaleDateString("en-US", {
                      year: "numeric",
                    })}
                  </span>
                  <br />
                  <span className="font-montserrat">
                    {event.startTime.toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </span>
                </div>
              </div>
              <div className="font-sans font-bold text-l">
                {startTimeString + (event.endTime ? " - " + endTimeString : "")}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-body-mobile font-montserrat gap-y-4">
          <div className="flex flex-row items-center">
            <img src={PinSVG} alt="Location" className="px-3" />
            <span> {event.location}</span>
          </div>
          <div className="flex flex-row items-center">
            <img src={TextIconSVG} alt="Cool icon" className="px-3" />
            <span className="break-words">{event.description}</span>
          </div>

          <div className="flex flex-row items-center">
            <img src={LinkSVG} alt="Link" className="px-3" />
            kaljfdklajfkaljfak
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
