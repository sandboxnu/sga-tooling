import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEvent } from "../client/client";

export type EventDetailsPageProps = {
  event?: Event;
};

const EventDetailsPage = ({ event }: EventDetailsPageProps): ReactElement => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  
  let myEvent = event;

  useEffect(() => {
    setLoading(true);

    fetchEvent(Number(id)).then().catch().finally();
    myEvent = "";

  }, [id]);

  return loading ? <p>Loading</p> : myEvent;

  // https://rapidapi.com/guides/loading-state-react

  // Original Implementation:
  // const [myEvent, setEvent] = useState<Event>();

  // // If an invalid ID is supplied, return the 404 Page

  // useEffect(() => {
  //   try {
  //     const eventId = parseInt(id || "we did not get an id :(");
  //     fetchEvent(eventId).then((myEvent) => {
  //       console.log(`The value is ${JSON.stringify(myEvent)}`);
  //       setEvent(myEvent);
  //     });
  //   } catch {
  //     console.log("could not parse - L");
  //   }
  // }, []);

  // if (myEvent) return <p>LOADING</p>;

  // return <p>{JSON.stringify(myEvent)}</p>;
};

export default EventDetailsPage;
