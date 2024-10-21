import { VoteHistory } from "../util/Types";

// pass in one instance of each, then in the outside component will map

// renders a Row of Votes a User has made
export const VotingRow = (row: VoteHistory) => {
  return (
    <div>
      <span>{row.question}</span>
      <span>{row.vote_selection}</span>
    </div>
  );
};
