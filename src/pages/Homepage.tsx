import { ReactElement } from "react";
import SearchIcon from "../assets/SearchIcon.svg";
import Alert from "../components/Alert";
import EventCard, { Status } from "../components/EventCard";
import EventsJSON from "../events.json";
import { Event } from "../util/Types";

const Homepage = (): ReactElement => {
  // Returns the given event's status based on the date and time of the event.
  function getStatus(start: Date, end: Date) {
    const today = new Date();
    const timeNow = today.getTime();

    if (start.getTime() < timeNow && timeNow < end.getTime()) {
      return Status.Live;
    } else {
      return Status.Rest;
    }
  }

  // Sorts the events by start time (earliest to latest)
  EventsJSON.sort((a, b) => {
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });

  const events: Event[] = (EventsJSON as unknown as Event[]).map((e) => {
    return {
      id: e.id,
      startTime: new Date(e.startTime),
      endTime: new Date(e.endTime),
      name: e.name,
      location: e.location,
      description: e.description,
      status: getStatus(new Date(e.startTime), new Date(e.endTime)),
      tags: e.tags,
    };
  });

  // Filters events into their corresponding status.
  const liveEvents: ReactElement[] = events
    .filter((e) => e.status === Status.Live)
    .map((e) => (
      <>
        <EventCard key={e.name} {...e} />
        <hr className="border-black home-mx" />
      </>
    ));

  const upcomingEvents: ReactElement[] = events
    .filter((e) => e.status === Status.Rest)
    .map((e, i) => {
      const prevDate = events[i - 1]
        ? events[i - 1].startTime.toDateString()
        : null;
      const currDate = events[i].startTime.toDateString();

      // Checks if this event is the first event of the day, and updates its status accordingly
      if (i === 0 || prevDate !== currDate) {
        e.status = Status.First;
        return <EventCard key={e.name} {...e} />;
      } else {
        return (
          <>
            <EventCard key={e.name} {...e} />
            <hr className="border-black home-mx" />
          </>
        );
      }
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
};

export default Homepage;
