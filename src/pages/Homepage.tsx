import { ReactElement, useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";
import {
  fetchAllEvents,
  fetchMember,
  findAttendanceChangeRequestForMember,
} from "../client/client";
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
  const [attendanceChanges, setAttendanceChanges] = useState<
    AttendanceChange[] | null
  >();
  const { userID } = useContext(LoginContext);

  useEffect(() => {
    //only go on load
    const loadAttendanceChanges = async () => {
      const Member = await fetchMember(userID!);
      if (Member) {
        const attendance = await findAttendanceChangeRequestForMember(
          Member.id
        );
        if (attendance) setAttendanceChanges(attendance);
      }
    };

    loadAttendanceChanges();
  }, [userID]);

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

    if (!attendanceChanges) return <Loading />;

    // for each element, we then look at each eventid and try to match with the corresponding
    // eventid if it has one, then we pass that attendanceChange in if there is one.
    const liveEvents: ReactElement[] = events
      .filter((e) => e.status === EventStatus.Live)
      .map((e) => (
        <div className="lg:rounded-xl lg:border-4 lg:border-gray-300 lg:border-l-6 lg:rounded-l-none lg:border-l-sga-red lg:bg-gray-100">
          <EventCard key={e.eventName} event={e} />
        </div>
      ));

    const upcomingEvents: ReactElement[] = events
      .filter((e) => e.status === EventStatus.Rest)
      .map((e, i) => {
        const prevDate = events[i - 1]
          ? events[i - 1].startTime.toDateString()
          : null;
        const currDate = events[i].startTime.toDateString();

        //if we have the same event ids, then add in attendanceChange
        const potentialAttendanceChange = attendanceChanges?.find(
          (element) => e.id === element.eventID
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
                  key={e.eventName}
                  event={e}
                  attendanceChange={potentialAttendanceChange}
                />
              ) : (
                <EventCard key={e.eventName} event={e} />
              )}
            </>
          );
        }
        return potentialAttendanceChange ? (
          <EventCard
            key={e.eventName}
            event={e}
            attendanceChange={potentialAttendanceChange}
          />
        ) : (
          <EventCard key={e.eventName} event={e} />
        );
      });

    return (
      <div className="lg:flex lg:flex-col lg:justify-between lg:items-start lg:max-w-[80%]">
        <h1 className="lg:text-sga-red lg:m-6 lg:mb-3 section-heading">
          Happening Now
        </h1>
        <div className="lg:m-6 lg:mt-3">{liveEvents}</div>

        <Alert
          message="Your standing in SGA may be affected if you miss the next event."
          className="home-mx mt-5 lg:hidden"
        />

        <div className="section-heading flex justify-between items-center">
          <h1>Upcoming Events</h1>
        </div>
        {upcomingEvents}
      </div>
    );
  }
};

export default Homepage;
