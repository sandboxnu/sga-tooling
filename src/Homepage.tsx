import { ReactElement } from "react";
import SearchIcon from "./assets/SearchIcon.svg";
import Alert from "./components/Alert";
import EventCard, { Event } from "./components/EventCard";
import EventsJSON from "./events.json";

// Renders homepage with events.
const Homepage = (): ReactElement => {
  function getColor(start: Date, end: Date) {
    const today = new Date();
    const timeNow = today.getTime();

    if (start.getTime() < timeNow && timeNow < end.getTime()) {
      return "bg-sga-red";
    } else if (today.toDateString() === start.toDateString()) {
      return "bg-black";
    } else {
      return "bg-white";
    }
  }

  const events: Event[] = EventsJSON.map((e) => {
    return {
      startTime: new Date(e.startTime),
      endTime: new Date(e.endTime),
      name: e.name,
      location: e.location,
      description: e.description,
      color: getColor(new Date(e.startTime), new Date(e.endTime)),
      tags: e.tags,
    };
  });

  const liveEvents = events
    .filter((e) => e.color === "bg-sga-red")
    .map((e) => (
      <>
        <EventCard {...e} />
        <hr className="border-black home-mx" />
      </>
    ));

  const upcomingEvents = events
    .filter((e) => e.color !== "bg-sga-red")
    .map((e) => (
      <>
        <EventCard {...e} />
        <hr className="border-black home-mx" />
      </>
    ));

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
