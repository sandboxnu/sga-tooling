import { useQuery } from "@tanstack/react-query";
import { ReactElement, useContext } from "react";
import { LoginContext } from "../App";
import { getMemberVotingRecord, getQuestionsAvailable } from "../client/votes";
import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/Loading";
import { VotingRow } from "../components/VotingRow";
import { VoteHistory, VoteQuestions } from "../util/Types";

export const PastVotes = () => {
  const { userID } = useContext(LoginContext);

  // fetch all questions
  const {
    data: questions,
    isPending: questionsLoading,
    isError: questionError,
  } = useQuery<VoteQuestions[]>({
    queryFn: () => getQuestionsAvailable(),
    queryKey: ["api", "voting", "question"],
  });

  // fetch members Voting History
  const {
    data: votingHistory,
    isPending: votesPending,
    isError: votesError,
  } = useQuery<VoteHistory[]>({
    queryFn: () => getMemberVotingRecord(userID!),
    queryKey: ["api", "voting", "history", { userID }],
  });

  if (questionsLoading || votesPending) {
    return <Loading />;
  }

  if (questionError || votesError) {
    return <ErrorComponent />;
  }

  const groupedElementWithQuestion: ReactElement[] = questions.map((q) => {
    const correspondingVote = votingHistory.find((v) => {
      return v.vote_id === q.uuid;
    });

    return <VotingRow voteSubmission={correspondingVote} allQuestions={q} />;
  });

  // styling define the maxWidth of outside container
  // flex columns
  // each a flex row
  // set a maxWidth?? for each width of the question text so that there leaves a gap
  return <div>{groupedElementWithQuestion}</div>;
};
