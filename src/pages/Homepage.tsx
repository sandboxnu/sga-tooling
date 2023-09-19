import { ReactElement, useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";
import SearchIcon from "../assets/SearchIcon.svg";
import {
  fetchAllEvents,
  fetchMember,
  findAttendanceChangeRequestForMember,
} from "../client/client";
import Alert from "../components/Alert";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import { AttendanceChange, Event, EventStatus } from "../util/Types";

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
    console.log("in here again");
  }, []);

  //Typescript was being a bit weird with adding in the attendanceChanges in this parameter so adding
  // a use Effect to still keep the loading animation
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
        <>
          <EventCard key={e.eventName} event={e} />
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
