import { useQuery } from "@tanstack/react-query";
import { ReactElement, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoginContext } from "../App";
import SearchBarIcon from "../assets/SearchBarIcon.svg";
import { getAllAttendanceChangesForMember } from "../client/attendanceChange";
import { getAllEvents } from "../client/events";
import Alert from "../components/Alert";
import ErrorComponent from "../components/ErrorComponent";
import EventCard from "../components/EventCard";
import { DropDownComponent } from "../components/filters/HomePageDropDown";
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
  // TODO: swap this out...
  const { userID } = useContext(LoginContext);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

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

  console.log(attendanceChanges);

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

  // add in filtering logic
  const remainingEvents = events
    .filter((e) => e.status === EventStatus.Rest)
    .filter((e) =>
      e.event_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((e) => {
      const filters = searchParams.getAll("filter");
      const event_groups: string[] = Object.values(e.membership_group);

      return filters.every((v) => event_groups.includes(v));
    });

  const upcomingEvents: ReactElement[] = remainingEvents.map((e, i) => {
    const prevDate = events[i - 1]
      ? events[i - 1].start_time.toDateString()
      : null;
    const currDate = events[i].start_time.toDateString();

    //if we have the same event ids, then add in attendanceChange
    const potentialAttendanceChange = attendanceChanges.find(
      (element) => e.uuid === element.event_id
    );

    // Checks if this event is the first event of the day, and updates its status accordingly
    if (i === 0) {
      e.status = EventStatus.First;
    } else if (prevDate !== currDate) {
      e.status = EventStatus.First;
      return (
        <>
          <hr className="border-black home-mx lg:hidden lg:my-12" />
          <EventCard
            key={e.event_name}
            event={e}
            attendanceChange={potentialAttendanceChange}
          />
        </>
      );
    }
    return (
      <EventCard
        key={e.event_name}
        event={e}
        attendanceChange={potentialAttendanceChange}
      />
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

      <div className="flex">
        <div className="border flex items-center">
          <img src={SearchBarIcon} className="w-4 h-4" />
          <input
            className="py-0.5 text-lg w-80 font-medium text-attendance-grey bg-search-icon border-none"
            placeholder="Search Events"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        <DropDownComponent />
      </div>

      <Alert
        message="Your standing in SGA may be affected if you miss the next event."
        className="home-mx mt-5 lg:hidden"
      />

      <div className="section-heading flex justify-between items-center">
        <h1>Upcoming Events</h1>
      </div>
      <div className="flex flex-col lg:pb-6 lg:m-6 mt-6 lg:border-l-4 lg:border-gray-300 gap-12">
        {remainingEvents.length !== 0 ? (
          upcomingEvents
        ) : (
          <>Filtered Out Results</>
        )}
      </div>
    </div>
  );
};

export default Homepage;
