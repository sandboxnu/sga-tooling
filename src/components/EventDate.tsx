import { ReactElement } from "react";
import { EventStatus } from "../util/Types";

// Renders an event's day of the month numerically, month, and day of the week.
export const EventDate = (props: {
  startTime: Date;
  status?: EventStatus;
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
    "w-full h-12 md:h-14 lg:h-20 flex lg:flex-col justify-center items-center rounded-r-2xl text-xl md:text-2xl lg:text-md font-bold text-white";

  // Assigns a background color for this date.
  const bgColor = baseStyle + " " + props.status;

  return (
    <>
      <div className="w-16 md:w-20 flex flex-col items-center lg:hidden">
        {props.status === EventStatus.Live ? (
          <div className={bgColor}>LIVE</div>
        ) : props.status === EventStatus.First ? (
          <>
            <div className={bgColor}>{date.num}</div>
            <div className="mt-1 flex flex-col items-center text-lg md:text-xl">
              <p>{date.month}</p>
              <p>{date.day}</p>
            </div>
          </>
        ) : null}
      </div>
      <div className="hidden w-16 md:w-20 lg:flex lg:flex-col lg:items-center ml-[-4px]">
        {props.status === EventStatus.Live ? (
          <div className={bgColor}>LIVE</div>
        ) : props.status === EventStatus.First ? (
          <>
            <div className={bgColor}>
              <p className="">{date.num}</p>
              {date.month}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
