import { ReactElement, useEffect, useState } from "react";
import { findAttendanceChangeRequestForMember } from "../client/client";
import Alert from "../components/Alert";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import { useAuth } from "../hooks/useAuth";
import useEvents from "../hooks/useEvents";
import { AttendanceChange, EventStatus } from "../util/Types";

// Renders homepage with events.
const Homepage = (): ReactElement => {
  const [attendanceChanges, setAttendanceChanges] = useState<
    AttendanceChange[] | null
  >();
  const { member } = useAuth();
  const { status, data: events, error, isFetching } = useEvents();

  useEffect(() => {
    //only go on load
    const loadAttendanceChanges = async () => {
      if (member) {
        const attendance = await findAttendanceChangeRequestForMember(
          member.id
        );
        if (attendance) setAttendanceChanges(attendance);
      }
    };

    loadAttendanceChanges();
  }, [member]);
  if (isFetching) return <Loading />;
  else if (status === "error") {
    return <div>Error: {error.message}</div>;
  } else if (events) {
    if (!attendanceChanges) return <Loading />;

    // for each element, we then look at each eventid and try to match with the corresponding
    // eventid if it has one, then we pass that attendanceChange in if there is one.
    const liveEvents: ReactElement[] = events
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

    return (
      <div className="lg:flex lg:flex-col lg:justify-between lg:items-start lg:max-w-[70%]">
        <h1 className="hidden lg:block lg:m-6 lg:mb-3 section-heading">
          EVENTS
        </h1>
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
