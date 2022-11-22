import { ReactElement } from "react";

const EventTag = (props: { tag: string }): ReactElement => {
  const color = () => {
    switch (props.tag) {
      case "Senate":
        return "bg-tag-blue";
      case "Committee":
        return "bg-tag-green";
      default:
        return "bg-gray-300"; // ask josh for default background color?
    }
  };

  return (
    <>
      <span
        className={
          color() +
          " break-words rounded-xl text-sm font-bold font-sans px-4 py-1"
        }
      >
        {props.tag}
      </span>
    </>
  );
};

export default EventTag;
