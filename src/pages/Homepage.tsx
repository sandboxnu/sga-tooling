import { ReactElement, useState } from "react";
import LoadingGIF from "../assets/Loading.gif";
import SearchIcon from "../assets/SearchIcon.svg";
import { fetchAllEvents } from "../client/client";
import Alert from "../components/Alert";
import EventCard from "../components/EventCard";
import { Event, EventStatus } from "../util/Types";

function getStatus(start: Date, end: Date) {
  const today = new Date();
  const timeNow = today.getTime();

  if (start.getTime() < timeNow && timeNow < end.getTime()) {
    return EventStatus.Live;
  } else if (today.toDateString() === start.toDateString()) {
    return EventStatus.First;
  } else {
    return EventStatus.Rest;
  }
}

function isSameDay(date1: Date, date2: Date) {
  return date1.toDateString() === date2.toDateString();
}

// Renders homepage with events.
const Homepage = (): ReactElement => {
  const [eventsToDisplay, setEventsToDisplay] = useState<Event[] | null>(null);

  if (!eventsToDisplay) {
    fetchAllEvents().then((e) => {
      setEventsToDisplay(e);
    });
    return (
      <div className="w-100 h-100 my-1 flex justify-center">
        <img src={LoadingGIF} alt="Loading" className="w-1/5" />
      </div>
    );
  } else {
    const liveEvents: ReactElement[] = [];
    const upcomingEvents: ReactElement[] = [];

    const events: Event[] = eventsToDisplay.map((e) => {
      return {
        ...e,
        status: getStatus(new Date(e.startTime), new Date(e.endTime)),
      };
    });

    // Filters events into their corresponding status.
    events.reduce(
      function (result, curr, i) {
        let component = (
          <>
            <EventCard key={curr.id} {...curr} />
            {i > 0 &&
            isSameDay(curr.startTime, events[i - 1].startTime) ? null : (
              <hr className="border-black home-mx" />
            )}
          </>
        );

        if (curr.status === EventStatus.Live) {
          result[0].push(component);
        } else {
          result[1].push(component);
        }

        return result;
      },
      [liveEvents, upcomingEvents]
    );

    return (
      <>
        <h1 className="section-heading">HAPPENING NOW</h1>
        {liveEvents}

        <Alert
          message="Your standing in SGA may be affected if you miss the next event."
          className="home-mx mt-5"
        />

        <div className="section-heading flex justify-between items-center">
          <h1>UPCOMING EVENTS</h1>
          <img src={SearchIcon} aria-label="Search for an event"></img>
        </div>
        {upcomingEvents}
      </>
    );
  }
};

export default Homepage;
