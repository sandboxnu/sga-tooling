import { ReactElement } from "react";
import SearchIcon from "../assets/SearchIcon.svg";
import Alert from "../components/Alert";
import EventCard, { Status } from "../components/EventCard";
import { mockEvents } from "../data/events";

// Renders homepage with events.
const Homepage = (): ReactElement => {
  function getStatus(start: Date, end: Date) {
    const today = new Date();
    const timeNow = today.getTime();

    if (start.getTime() < timeNow && timeNow < end.getTime()) {
      return Status.Live;
    } else if (today.toDateString() === start.toDateString()) {
      return Status.Today;
    } else {
      return Status.Upcoming;
    }
  }

  function isSameDay(date1: Date, date2: Date) {
    return date1.toDateString() === date2.toDateString();
  }

  const events = mockEvents;

  const liveEvents: ReactElement[] = [];
  const upcomingEvents: ReactElement[] = [];

  // Filters events into their corresponding status.
  events.reduce(
    function (result, curr, i) {
      let component = (
        <>
          <EventCard key={curr.eventName} {...curr} />
          {i > 0 &&
          isSameDay(curr.startTime, events[i - 1].startTime) ? null : (
            <hr className="border-black home-mx" />
          )}
        </>
      );

      if (curr.status === Status.Live) {
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
};

export default Homepage;
