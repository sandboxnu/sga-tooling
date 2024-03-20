interface AppliedFilterPillProps {
  label: string;
  // needs to update previous state:
  // passing down state twice is fun :)
}

export const AppliedFilterPill = ({ label }: AppliedFilterPillProps) => {
  // TODO: handle X on Click
  return (
    <div>
      <button onClick={(e) => e.preventDefault()}>X</button>
      {label}
    </div>
  );
};
