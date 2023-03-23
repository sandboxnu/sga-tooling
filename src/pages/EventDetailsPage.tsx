import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import Frame from ".././assets/Frame.svg";
import LinkSVG from ".././assets/Link.svg";
import MeatballMenuSVG from ".././assets/MeatballMenu.svg";
import PinSVG from ".././assets/Pin.svg";
import TextIconSVG from ".././assets/TextIcon.svg";
import { fetchEvent } from "../client/client";
import Loading from "../components/Loading";
import { Event } from "../util/Types";

export type EventDetailsPageProps = {
  Event?: Event;
};

//if time is not defined make it all day
const EventDetailsPage = ({ Event }: EventDetailsPageProps): ReactElement => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const { id } = useParams();
  const [event, setEvent] = useState(Event);

  if (!event) {
    fetchEvent(Number(id)).then((e) => {
      setEvent(e);
    });
    return <Loading />;
  }

  const startDate = new Date(event.startTime);
  const month = months[startDate.getMonth()];
  const dayOfWeek = days[startDate.getDay()];
  const date = startDate.getDate();
  const year = startDate.getFullYear();

  const startTimeString: string = startDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const endTimeString: string | undefined = event.endTime
    ? new Date(event.endTime).toLocaleString("en-US", {
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
        {event.eventName}
      </div>
      <div className="flex flex-col w-full md:flex-row gap-12">
        <div className="flex flex-row h-60 md:w-6/12 md:h-96">
          <div className="flex-1 bg-no-repeat bg-isec bg-cover rounded-l-2xl object-cover" />
          <div className="flex-1 bg-sga-red rounded-r-2xl text-white text-right p-4">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="font-sans font-bold text-5xl">{date}</div>
                <div className="text-l">
                  <span className="font-sans font-bold">{month}</span>
                  <span className="font-montserrat pl-1">'{year}</span>
                  <br />
                  <span className="font-montserrat">{dayOfWeek}</span>
                </div>
              </div>
              <div className="font-sans font-bold text-l">
                {startTimeString + (event.endTime ? " - " + endTimeString : "")}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-body-mobile font-montserrat gap-y-4 md:w-1/2">
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
            kaljfdklajfkaljfaj
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
