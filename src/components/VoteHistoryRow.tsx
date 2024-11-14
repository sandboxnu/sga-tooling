import { VoteHistory } from "../util/Types";

interface VoteHistoryProps {
  voteRow: VoteHistory;
}

export const VoteHistoryRow = ({ voteRow }: VoteHistoryProps) => {
  return (
    <div className="flex justify-between pb-2">
      <div className="w-10/12 pr-4">{voteRow.question}</div>
      <div className="w-10 font-bold pl-4">{voteRow.vote_selection}</div>
    </div>
  );
};
