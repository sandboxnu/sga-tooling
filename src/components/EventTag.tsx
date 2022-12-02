import { ReactElement } from "react";

export enum Tag {
  Senate = "bg-tag-blue",
  Committee = "bg-tag-green",
  Default = "bg-gray-300",
}

const EventTag = (props: { tag: string }): ReactElement => {
  let color = Tag[props.tag as keyof typeof Tag];

  if (!Object.keys(Tag).includes(props.tag)) {
    color = Tag.Default;
  }

  return (
    <span
      className={
        color + " break-words rounded-xl text-sm font-bold font-sans px-4 py-1"
      }
    >
      {props.tag}
    </span>
  );
};

export default EventTag;
