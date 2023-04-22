import { ReactElement, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MeatballMenuSVG from ".././assets/MeatballMenu.svg";
import PinSVG from ".././assets/Pin.svg";
import TextIconSVG from ".././assets/TextIcon.svg";
import ".././styles.css";
import { LoginContext } from "../App";
import { mockReports } from "../data/reports";
import { Event, EventStatus, ReportReason } from "../util/Types";
import { EventDate } from "./EventDate";
import EventTag from "./EventTag";

/**
 * Renders a single event in the feed
 */
const EventCard = (event: Event): ReactElement => {
  const {
    id,
    startTime,
    endTime,
    eventName,
    location,
    description,
    status,
    tags,
  } = event;

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

  const tagElements: ReactElement[] = tags
    ? tags.map((t) => {
      return <EventTag tag={t} />;
    })
    : [];

  // Default for an event is registered 
  const [isRegistered, setIsRegistered] = useState(true);
  const [flag, setFlag] = useState(false);
  const { userID } = useContext(LoginContext);


  // const findMatchingReport = () => {
  //   for (const item of mockReports) {
  //     if (item.event_id === event.id) {
  //       if (item.member_id === Number(userID)) {
  //         console.log("made it here");
  //         console.log(item.request_id);
  //         for (const attendances of mockAttendanceChange) {
  //           if (attendances.id === item.request_id) {
  //             //we do here something here:
  //             setIsRegistered(!isRegistered);
  //           }
  //         }
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   findMatchingReport();
  // }, []);

  const regButtonStyle = isRegistered
    ? "button-base-white px-3 my-2 mr-5 w-32"
    : "button-base-red px-4 my-2 mr-5 w-32";

  // Called whenever the Register/Unregister button is pressed; 
  const toggleReg = () => {
    console.log("original    : " + isRegistered);


    setIsRegistered(!isRegistered);
    setFlag(!flag);

    console.log("toggleReg   : " + isRegistered);
    // POST API Call Here

  };

  useEffect(() => {
    // setIsRegistered is an async function and you cannot get the state value immediately after update.
    // If you want to get the updated state value then use useEffect hook with dependency array. 
    // React will execute this hook after each state update.
    console.log("useEffect   : " + isRegistered);
    console.log("flag        : " + flag);
    if (flag) {
      setFlag(!flag);
      mockReportCall();
      console.log(mockReports.length);
    }
  }, [isRegistered, setFlag]);

  const mockReportCall = () => {
    console.log("making mock call");

    let rprt = {
      id: 100,
      member_id: 25,
      reported_time: new Date("2000-01-01 00:00:00"),
      report_reason: "Reasonable reason 1",
      report_description: ReportReason.DISMISSED,
      event_id: 1,
      request_id: 1,
      resolution_time: new Date("2000-01-02 00:00:00"),
      resolution_action: new Date("2000-01-03 00:00:00"),
    };

    mockReports.push(rprt);
  }

  // To mock a request, in client.ts add an async mock request helper that pulls from example data and waits 1 second to send a success or failure.
  // Look at the other helper functions for reference.



  return (
    <div className="flex my-8 md:my-10">
      <EventDate startTime={startTime} status={status} />
      <div className="flex-1 px-6 md:px-10">
        <span className="font-sans">
          {startTimeString + (endTime ? " to " + endTimeString : "")}
        </span>
        <div className="flex flex-row justify-between items-start mb-4">
          <div className="not-italic font-bold text-2xl leading-8 font-sans break-words w-4/5">
            {eventName}
          </div>
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
                <li className="hover:underline border-t border-gray-300 border-solid pb-3 pt-2 px-4">
                  Add to Calendar
                </li>
              </ul>
            </div>
          </details>
        </div>
        <div
          className={
            "flex flex-row flex-wrap gap-y-2 gap-x-2 w-full " +
            (tagElements.length > 0 ? "mb-4" : "")
          }
        >
          {tagElements}
        </div>
        <div className="flex flex-row items-start mb-4 md:ml-4">
          <img src={PinSVG} alt="Pin svg" className="p-1 pt-0" />
          <span className="text-body-mobile pl-2 pr-8 pt-0.5 font-montserrat break-words w-full md:pr-64">
            {location}
          </span>
        </div>
        <div className="flex flex-row items-start mb-6 md:ml-4">
          <img src={TextIconSVG} alt="TextIcon svg" className="p-1 pt-0" />
          <p className="text-body-mobile pl-2 pr-8 font-montserrat break-words w-full">
            {description}
          </p>
        </div>

        <div className="flex flex-row flex-wrap">
          {status === EventStatus.Live ? (
            <button className="button-base-disabled px-4 my-2" disabled={true}>
              Vote
            </button>
          ) : (
            <>
              <button onClick={toggleReg} className={regButtonStyle}>
                {isRegistered ? "Unregister" : "Register"}
              </button>
              <Link to={`/events/${id}`} state={{ event }}>
                <button className="button-base-red px-4 my-2 w-32">
                  See More
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
