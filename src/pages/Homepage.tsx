import React, { ReactElement, useState } from "react";
import Alert from "../components/Alert";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import useAttendanceChanges from "../hooks/useAttendanceChanges";
import { useAuth } from "../hooks/useAuth";
import useEvents from "../hooks/useEvents";
import { EventStatus } from "../util/Types";

// Renders homepage with events.
const Homepage = (): ReactElement => {
  const { member } = useAuth();
  const { status, data: events, error, isFetching } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const displayedEvents = React.useMemo(() => {
    return searchTerm === ""
      ? events
      : events?.filter((event) =>
          event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
        );
  }, [events, searchTerm]);
  const {
    status: fetchAttendanceChangesStatus,
    data: attendanceChanges,
    error: fetchAttendanceChangesError,
    isFetching: isFetchingAttendanceChanges,
  } = useAttendanceChanges(undefined, member?.id, undefined);

  if (isFetching || isFetchingAttendanceChanges) return <Loading />;
  else if (status === "error") {
    return <div>Error: {error.message}</div>;
  } else if (fetchAttendanceChangesStatus === "error") {
    return <div>Error: {fetchAttendanceChangesError.message}</div>;
  } else if (displayedEvents && attendanceChanges) {
    // for each element, we then look at each eventid and try to match with the corresponding
    // eventid if it has one, then we pass that attendanceChange in if there is one.
    const liveEvents: ReactElement[] = displayedEvents
      .filter((e) => e.status === EventStatus.Live)
      .map((e, i) => (
        <div
          className={`${
            i > 0 && " mb-4"
          } lg:rounded-xl lg:border-4 lg:border-sga-red lg:bg-gray-100 lg:py-6`}
        >
          <EventCard key={e.eventName} event={e} />
        </div>
      ));

    const upcomingEvents: ReactElement[] = displayedEvents
      .filter((e) => e.status === EventStatus.Rest)
      .filter((e) => e.startTime > new Date())
      .map((ev, i) => {
        let e = structuredClone(ev);
        const prevDate = displayedEvents[i - 1]
          ? displayedEvents[i - 1].startTime.toDateString()
          : null;
        const currDate = displayedEvents[i].startTime.toDateString();

        //if we have the same event ids, then add in attendanceChange
        const potentialAttendanceChange = attendanceChanges?.find(
          (element) => e.id === element.eventId
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

    console.log(upcomingEvents.length);

    return (
      <div className="lg:flex lg:flex-col lg:justify-between lg:items-start lg:max-w-[70%]">
        <h1 className="hidden lg:block lg:m-6 lg:mb-3 section-heading">
          EVENTS
        </h1>
        <div className="lg:m-6 mt-6 relative">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full p-2 pl-10 border border-black-300 rounded-lg"
            onChange={(e) => {
              const searchTerm = e.target.value;
              setSearchTerm(searchTerm);
            }}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
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
  } else {
    return <></>;
  }
};

export default Homepage;
