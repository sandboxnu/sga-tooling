import { ReactElement } from "react";

// Renders an event's day of the month numerically, month, and day of the week.
export const EventDate = (props: {
  startTime: Date;
  color: string;
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
    "w-16 h-12 md:w-20 md:h-14 rounded-r-2xl flex justify-center items-center text-xl md:text-2xl font-bold text-white";

  const colorStyle = `${baseStyle} ${
    props.color === "bg-white" ? `${props.color} text-black` : props.color
  }`;

  return (
    <div>
      {props.color === "bg-sga-red" ? (
        <div className={colorStyle}>LIVE</div>
      ) : (
        <>
          <div className={colorStyle}>{date.num}</div>
          <div className="mt-1 flex flex-col items-center text-lg md:text-xl">
            <p>{date.month}</p>
            <p>{date.day}</p>
          </div>
        </>
      )}
    </div>
  );
};
