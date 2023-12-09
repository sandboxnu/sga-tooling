import { ReactElement, useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";
import { getAllAttendanceChangesForMember } from "../client/attendanceChange";

import { getAllEvents } from "../client/event";
import Alert from "../components/Alert";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import { AttendanceChange, Event, EventStatus } from "../util/Types";

/**
 * Compares the current time to a given start and end date to return the associated event status
 * @param start The start date
 * @param end The end date
 * @returns Returns a live event status if the start time is before the current time and the end time is after the current time
 */
function getStatus(start: Date, end?: Date) {
  const today = new Date();
  const timeNow = today.getTime();

  if (start.getTime() < timeNow && end && timeNow < end.getTime()) {
    return EventStatus.Live;
  } else {
    return EventStatus.Rest;
  }
}

// Renders homepage with events.
const Homepage = (): ReactElement => {
  const [eventsToDisplay, setEventsToDisplay] = useState<Event[] | null>();
  const [attendanceChanges, setAttendanceChanges] = useState<
    AttendanceChange[] | null
  >();
  const { userID } = useContext(LoginContext);
  console.log(userID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getAllEvents();
        setEventsToDisplay(events);

        const attendance = await getAllAttendanceChangesForMember(userID!);
        setAttendanceChanges(attendance);
      } catch (err) {
        //setAnError/timeout
      }
    };

    fetchData();
  }, [userID]);

  if (!eventsToDisplay || !attendanceChanges) {
    // TODO: this needs a way to timeout othewise this continously loads
    return <Loading />;
  } else {
    const events: Event[] = eventsToDisplay.map((e) => {
      const endTime = e.end_time ? new Date(e.end_time) : undefined;
      return {
        ...e,
        start_time: new Date(e.start_time),
        ...(e.end_time && { end_time: new Date(e.end_time) }),
        status: getStatus(new Date(e.start_time), endTime),
      };
    });

    // for each element, we then look at each eventid and try to match with the corresponding
    // eventid if it has one, then we pass that attendanceChange in if there is one.
    const liveEvents: ReactElement[] = events
      .filter((e) => e.status === EventStatus.Live)
      .map((e) => (
        <>
          <EventCard key={e.event_name} event={e} />
          <hr className="border-black home-mx" />
        </>
      ));

    const upcomingEvents: ReactElement[] = events
      .filter((e) => e.status === EventStatus.Rest)
      .sort((a, b) => {
        return (
          new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
        );
      })
      .map((e, i) => {
        const prevDate = events[i - 1]
          ? events[i - 1].start_time.toDateString()
          : null;
        const currDate = events[i].start_time.toDateString();

        //if we have the same event ids, then add in attendanceChange
        const potentialAttendanceChange = attendanceChanges?.find(
          (element) => e.uuid === element.eventID
        );

        // Checks if this event is the first event of the day, and updates its status accordingly
        if (i === 0) {
          e.status = EventStatus.First;
        } else if (prevDate !== currDate) {
          e.status = EventStatus.First;
          return (
            <>
              <hr className="border-black home-mx" />
              {potentialAttendanceChange ? (
                <EventCard
                  key={e.event_name}
                  event={e}
                  attendanceChange={potentialAttendanceChange}
                />
              ) : (
                <EventCard key={e.event_name} event={e} />
              )}
            </>
          );
        }
        return potentialAttendanceChange ? (
          <EventCard
            key={e.event_name}
            event={e}
            attendanceChange={potentialAttendanceChange}
          />
        ) : (
          <EventCard key={e.event_name} event={e} />
        );
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
        </div>
        {upcomingEvents}
      </>
    );
  }
};

export default Homepage;
