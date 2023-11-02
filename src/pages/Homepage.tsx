import { ReactElement, useState } from "react";
import SearchIcon from "../assets/SearchIcon.svg";
import { fetchAllEvents } from "../client/client";
import Alert from "../components/Alert";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import { Event, EventStatus } from "../util/Types";

/**
 * Compares the current time to a given start and end date to return the associated event status
 * @param start The start date
 * @param end The end date
 * @returns Returns a live event status if the start time is before the current time and the end time is after the current time
 */
function getStatus(start: Date, end: Date) {
  const today = new Date();
  const timeNow = today.getTime();

  if (start.getTime() < timeNow && timeNow < end.getTime()) {
    return EventStatus.Live;
  } else {
    return EventStatus.Rest;
  }
}

// Renders homepage with events.
const Homepage = (): ReactElement => {
  const [eventsToDisplay, setEventsToDisplay] = useState<Event[] | null>();

  if (!eventsToDisplay) {
    fetchAllEvents().then((e) => {
      e.sort((a, b) => {
        return (
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        );
      });
      setEventsToDisplay(e);
    });

    return <Loading />;
  } else {
    const events: Event[] = eventsToDisplay.map((e) => {
      return {
        ...e,
        status: getStatus(new Date(e.startTime), new Date(e.endTime)),
      };
    });

    const liveEvents: ReactElement[] = events
      .filter((e) => e.status === EventStatus.Live)
      .map((e) => (
        <>
          <EventCard key={e.eventName} {...e} />
          <hr className="border-black home-mx" />
        </>
      ));

    const upcomingEvents: ReactElement[] = events
      .filter((e) => e.status === EventStatus.Rest)
      .map((e, i) => {
        const prevDate = events[i - 1]
          ? events[i - 1].startTime.toDateString()
          : null;
        const currDate = events[i].startTime.toDateString();

        // Checks if this event is the first event of the day, and updates its status accordingly
        if (i === 0) {
          e.status = EventStatus.First;
        } else if (prevDate !== currDate) {
          e.status = EventStatus.First;
          return (
            <>
              <hr className="border-black home-mx" />
              <EventCard key={e.eventName} {...e} />
            </>
          );
        }
        return <EventCard key={e.eventName} {...e} />;
      });

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
