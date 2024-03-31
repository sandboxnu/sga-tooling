import { VoteHistory, VoteQuestions } from "../util/Types";

// pass in one instance of each, then in the outside component will map
interface VotingRowProps {
  voteSubmission: VoteHistory;
  allQuestions: VoteQuestions;
}

// renders a Row of Votes a User has made
export const VotingRow = ({ voteSubmission, allQuestions }: VotingRowProps) => {
  return (
    <div>
      <span>{allQuestions.question}</span>
      <span>{voteSubmission.vote_selection}</span>
    </div>
  );
};
