import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { LoginContext } from "../App";
import { getMembersPastVotes } from "../client/votes";
import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/Loading";
import { VoteQuestions } from "../util/Types";

export const PastVotesComponent = () => {
  const { userID } = useContext(LoginContext);

  const {
    data: pastVotes,
    isPending: historyLoading,
    isError: historyError,
  } = useQuery<VoteQuestions[]>({
    queryFn: () => getMembersPastVotes(userID!),
    queryKey: ["api", "voting", "history", { userID }],
  });

  if (historyLoading) {
    return <Loading />;
  }

  if (historyError) {
    return <ErrorComponent />;
  }

  // // if nothing returns back (falsy) -> return a have not voted component
  // // otherwise show content using the mappings
  // const groupedElementWithQuestion: ReactElement[] = questions.map((q) => {
  //   const correspondingVote = votingHistory.find((v) => {
  //     return v.vote_id === q.uuid;
  //   });

  //   return <VotingRow voteSubmission={correspondingVote} allQuestions={q} />;
  // });

  // styling define the maxWidth of outside container
  // flex columns
  // each a flex row
  // <div>{groupedElementWithQuestion}</div>;
  // set a maxWidth?? for each width of the question text so that there leaves a gap
  return (
    <div>{pastVotes ? <></> : <>You have Not Voted On Any Question</>}</div>
  );
};
