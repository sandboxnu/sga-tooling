import { saveAs } from "file-saver";
import { Event } from "./Types";

function saveICSEvent(event: Event) {
  const pad = (num: number) => (num < 10 ? "0" : "") + num;

  const formatDate = (date: Date) => {
    return (
      date.getUTCFullYear() +
      pad(date.getUTCMonth() + 1) +
      pad(date.getUTCDate()) +
      "T" +
      pad(date.getUTCHours()) +
      pad(date.getUTCMinutes()) +
      pad(date.getUTCSeconds()) +
      "Z"
    );
  };

  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:${new Date().getTime()}
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(event.startTime)}
DTEND:${formatDate(event.endTime)}
SUMMARY:${event.eventName}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR
  `.trim();

  const fileBlob = new Blob([icsContent], { type: "text/calendar" });
  saveAs(fileBlob, "event.ics");
}

export { saveICSEvent };
