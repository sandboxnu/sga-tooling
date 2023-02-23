import { ReactElement } from "react";
import { Status } from "./EventCard";

// Renders an event's day of the month numerically, month, and day of the week.
export const EventDate = (props: {
  startTime: Date;
  status: Status;
}): ReactElement => {
  const date = {
    num: props.startTime.getDate(),
    month: props.startTime.toLocaleString("en-US", {
      month: "short",
    }),
    day: props.startTime.toLocaleString("en-US", {
      weekday: "short",
    }),
  };

  const baseStyle =
    "w-full h-12 md:h-14 flex justify-center items-center rounded-r-2xl text-xl md:text-2xl font-bold text-white";

  // Assigns a background color for this date.
  const bgColor = baseStyle + " " + props.status;

  return (
    <div className="w-16 md:w-20 flex flex-col items-center">
      {props.status === Status.Live ? (
        <div className={bgColor}>LIVE</div>
      ) : props.status === Status.First ? (
        <>
          <div className={bgColor}>{date.num}</div>
          <div className="mt-1 flex flex-col items-center text-lg md:text-xl">
            <p>{date.month}</p>
            <p>{date.day}</p>
          </div>
        </>
      ) : null}
    </div>
  );
};
