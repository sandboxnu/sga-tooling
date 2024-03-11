import { ReactElement, useContext, useState } from "react";
import { LoginContext } from "../App";
import Loading from "../components/Loading";
import { AttendanceChange, Event, EventStatus } from "../util/Types";
// import { queryClient } from "../App";
import { useQuery } from "@tanstack/react-query";
import { getAllAttendanceChangesForMember } from "../client/attendanceChange";
import { getAllEvents } from "../client/events";
import Alert from "../components/Alert";
import ErrorComponent from "../components/ErrorComponent";
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
  const [searchQuery, setSearchQuery] = useState("");
  // filtering by dropdown option going to take a little longer ->
  // need there to be a button which can add filter button pills onto a flex row,
  // options first drop down

  // select drop down
  // icon is a + sign, with all the unused filters available

  // once filter is chosen adds a new button with the option to remove/ x
  // these buttons are then stacked on the same row

  // and with the selected filters, needs to apply filtering logic onto the tags of the elements as well

  // components -> applied filter chip (creates the filter pill)
  // the select drop down which when a filter is chosen -> applies the option/removes it from possibilities
  // need to then keep track of which filters are chosen -> then

  // fetch all the events
  const {
    data: dataEvents,
    isPending: eventsLoading,
    isError: eventsError,
  } = useQuery<Event[]>({
    queryFn: () => getAllEvents(),
    queryKey: ["api", "events"],
  });

  // fetch all the attendance change requests
  const {
    data: attendanceChanges,
    isPending: attendanceLoading,
    isError: acError,
  } = useQuery<AttendanceChange[]>({
    queryFn: () => getAllAttendanceChangesForMember(userID!),
    queryKey: ["api", "attendance", { userID }],
  });

  // Load until we get back results
  if (attendanceLoading || eventsLoading) {
    return <Loading />;
  }

  if (acError || eventsError) {
    return <ErrorComponent />;
  }

  const events = dataEvents
    .map((e) => {
      const endTime = e.end_time ? new Date(e.end_time) : undefined;
      return {
        ...e,
        start_time: new Date(e.start_time),
        ...(e.end_time && { end_time: new Date(e.end_time) }),
        status: getStatus(new Date(e.start_time), endTime),
      };
    })
    .sort((a, b) => {
      return (
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      );
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
    .filter((e) => e.status === EventStatus.Rest)
    .filter((e) => {
      return e.event_name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .map((e, i) => {
      const prevDate = events[i - 1]
        ? events[i - 1].start_time.toDateString()
        : null;
      const currDate = events[i].start_time.toDateString();

      //if we have the same event ids, then add in attendanceChange
      const potentialAttendanceChange = attendanceChanges.find(
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
      <div className="flex gap-4">
        <input
          className="ml-6 border"
          placeholder="Search Events"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>

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
