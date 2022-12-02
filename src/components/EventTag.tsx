import { ReactElement } from "react";

export enum Tag {
  Senate = "bg-tag-blue",
  Committee = "bg-tag-green",
  Default = "bg-gray-300", // ask josh for default background color?
}

const EventTag = (props: { tag: string }): ReactElement => {
  let tag = props.tag;

  if (!Object.keys(Tag).includes(props.tag)) {
    tag = "Default";
  }

  return (
    <span
      className={
        Tag[tag as keyof typeof Tag] +
        " break-words rounded-xl text-sm font-bold font-sans px-4 py-1"
      }
    >
      {props.tag}
    </span>
  );
};

export default EventTag;
