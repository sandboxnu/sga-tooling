import { ReactElement, useContext } from "react";
import { LoginContext } from "../App";
import Loading from "../components/Loading";
import { AttendanceChange, Event, EventStatus } from "../util/Types";
// import { queryClient } from "../App";
import { useQuery } from "@tanstack/react-query";
import { getAllAttendanceChangesForMember } from "../client/attendanceChange";
import { getAllEvents } from "../client/events";
import Alert from "../components/Alert";
import EventCard from "../components/EventCard";

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
  // TODO: swap this out...
  const { userID } = useContext(LoginContext);

  // fetch all the events
  const {
    data: dataEvents,
    isLoading: eventsLoading,
    isError: eventsError,
  } = useQuery<Event[]>({
    queryFn: () => getAllEvents(),
    queryKey: ["api", "events"],
  });

  // fetch all the attendance change requests
  const {
    data: attendanceChanges,
    isLoading: attendanceLoading,
    isError: acError,
  } = useQuery<AttendanceChange[]>({
    queryFn: () => getAllAttendanceChangesForMember(userID!),
    queryKey: ["api", "attendance", { userID }],
  });

  // Load until we get back results (see if this is an issue, we don't use the isLoading function?)
  if (attendanceLoading || eventsLoading) {
    return <Loading />;
  }

  // TODO: double check this, solves the type issues, and is error HandlingIsh,
  // if we have no Data, or we have an error -> return an error component, very sus though, and probably not good practice,
  if (acError || eventsError) {
    // will add in error component later
    return <></>;
  }

  // ehhhh -> non-null casting Fix this later...
  const events = dataEvents!.map((e) => {
    const endTime = e.end_time ? new Date(e.end_time) : undefined;
    return {
      ...e,
      start_time: new Date(e.start_time),
      ...(e.end_time && { end_time: new Date(e.end_time) }),
      status: getStatus(new Date(e.start_time), endTime),
    };
  });

  const liveEvents: ReactElement[] = events
    .filter((e) => e.status === EventStatus.Live)
    .map((e, i) => (
      <div
        className={`${
          i > 0 && " mb-4"
        } lg:rounded-xl lg:border-4 lg:border-sga-red lg:bg-gray-100 lg:py-6`}
      >
        <EventCard key={e.event_name} event={e} />
      </div>
    ));

  const upcomingEvents: ReactElement[] = events
    ?.filter((e) => e.status === EventStatus.Rest)
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
            <hr className="border-black home-mx lg:hidden lg:my-12" />
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
    <div className="lg:flex lg:flex-col lg:justify-between lg:items-start lg:max-w-[70%]">
      <h1 className="hidden lg:block lg:m-6 lg:mb-3 section-heading">EVENTS</h1>
      {liveEvents && liveEvents.length > 0 && (
        <>
          <h1 className="lg:text-sga-red lg:m-6 lg:my-3 section-heading">
            Happening Now
          </h1>
          <div className="lg:m-6 mt-6">{liveEvents}</div>
        </>
      )}

      <Alert
        message="Your standing in SGA may be affected if you miss the next event."
        className="home-mx mt-5 lg:hidden"
      />

      <div className="section-heading flex justify-between items-center">
        <h1>Upcoming Events</h1>
      </div>
      <div className="flex flex-col lg:pb-6 lg:m-6 mt-6 lg:border-l-4 lg:border-gray-300 gap-12">
        {upcomingEvents}
      </div>
    </div>
  );
};

export default Homepage;
