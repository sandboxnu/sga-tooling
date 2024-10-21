import { ReactElement } from "react";
import { TagButtonStyles } from "../util/styleConfig";
import { SGATags } from "../util/Types";

const EventTag = (props: { tag: SGATags }): ReactElement => {
  const text = TagButtonStyles[props.tag].text;
  const color = TagButtonStyles[props.tag].className;

  return (
    <span
      className={
        color + " break-words rounded-xl text-sm font-bold font-sans px-4 py-1"
      }
    >
      {text}
    </span>
  );
};

export default EventTag;
