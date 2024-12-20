import { ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import Frame from ".././assets/Frame.svg";
import LinkSVG from ".././assets/Link.svg";
import MeatballMenuSVG from ".././assets/MeatballMenu.svg";
import PinSVG from ".././assets/Pin.svg";
import TextIconSVG from ".././assets/TextIcon.svg";
import Loading from "../components/Loading";
import useEvent from "../hooks/useEvent";
import { createDateString } from "../util/Date";
import { saveICSEvent } from "../util/saveICSEvent";

//if time is not defined make it all day
const EventDetailsPage = (): ReactElement => {
  const { id } = useParams();
  const { status, data: event, error, isFetching } = useEvent(id);

  if (isFetching) {
    return <Loading />;
  } else if (status === "error") {
    return <div>Error: {error.message}</div>;
  } else if (event) {
    const { month, dayOfWeek, fulldate, year } = createDateString(
      event.startTime
    );

    const startTimeString: string = event.startTime.toLocaleString("en-US", {
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
          <Link to={`/events`}>
            <img src={Frame} alt="Back arrow" />
          </Link>
          <h1 className="section-heading m-0 text-md text-left flex-1 md:flex-0">
            <span>EVENT DETAILS</span>
          </h1>
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
                <li
                  className="hover:underline border-t border-gray-300 border-solid pb-3 pt-2 px-4"
                  onClick={() => saveICSEvent(event)}
                >
                  Add to Calendar
                </li>
              </ul>
            </div>
          </details>
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
                  <div className="font-sans font-bold text-5xl">{fulldate}</div>
                  <div className="text-l">
                    <span className="font-sans font-bold">{month}</span>
                    <span className="font-montserrat pl-1">'{year}</span>
                    <br />
                    <span className="font-montserrat">{dayOfWeek}</span>
                  </div>
                </div>
                <div className="font-sans font-bold text-l">
                  {startTimeString +
                    (event.endTime ? " - " + endTimeString : "")}
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
              <img
                src={TextIconSVG}
                alt="Cool icon"
                className="self-start px-3"
              />
              <span className="break-words">{event.description}</span>
            </div>
            <div className="flex flex-row items-center">
              <img src={LinkSVG} alt="Attachment" className="px-3" />
              Lorem ipsum.
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default EventDetailsPage;
