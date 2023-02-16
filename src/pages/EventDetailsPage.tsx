import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEvent } from "../client/client";
import { Event } from "../util/Types";

export type EventDetailsPageProps = {
  event?: Event;
};

const EventDetailsPage = ({ event }: EventDetailsPageProps): ReactElement => {
  const { id } = useParams();
  const [eventToDisplay, setEventToDisplay] = useState(event);

  if (!eventToDisplay) {
    fetchEvent(Number(id)).then((e) => {
      setEventToDisplay(e);
    });
    return <p>Loading</p>;
  } else {
    return <p>{JSON.stringify(eventToDisplay)}</p>;
  }
};

export default EventDetailsPage;
