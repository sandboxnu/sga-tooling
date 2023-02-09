import EventsJSON from "../data/events.json";

export function fetchEvent(id: Number): Promise<Event> {
  return new Promise(() => EventsJSON.find((e) => e["id"] === id));
}

// pray: https://youtu.be/py1LiJ3PpIU
