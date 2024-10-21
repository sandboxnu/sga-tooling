import { ReactElement } from "react";
// import { getMemberVotingRecord, getQuestionsAvailable } from "../client/votes";

import { Question } from "../components/Question";

// given two inputs find whether we are within the time range to show the dates:
const determineIfVoteAvailable = (time_start: Date, time_end: Date) => {
  const today = new Date();
  return today >= time_start && today <= time_end;
};

export const VotingPage = (): ReactElement => {
  /*
    TODO: authentication before entering
    WebSockets/Some form of live updating of votes coming in
    */
  // const { userID } = useContext(LoginContext);
  // // fetch all questions
  // const {
  //   data: questions,
  //   isPending: questionsLoading,
  //   isError: questionError,
  // } = useQuery<VoteQuestions[]>({
  //   queryFn: () => getQuestionsAvailable(),
  //   queryKey: ["api", "voting", "question"],
  // });

  // // fetch members Voting History
  // const {
  //   data: votingHistory,
  //   isPending: votesPending,
  //   isError: votesError,
  // } = useQuery<VoteHistory[]>({
  //   queryFn: () => getMemberVotingRecord(userID!),
  //   queryKey: ["api", "voting", "history", { userID }],
  // });

  // if (questionsLoading || votesPending) {
  //   return <Loading />;
  // }

  // if (questionError || votesError) {
  //   return <ErrorComponent />;
  // }

  // // cast time_start to propert date_time
  // const questionsWithDate = questions.map((q) => {
  //   return {
  //     ...q,
  //     time_start: new Date(q.time_start),
  //     time_end: new Date(q.time_end),
  //   };
  // });

  // // check if the member has voted, find a question within range
  // const availableQuestion: VoteQuestions | undefined = questionsWithDate.find(
  //   (q) => {
  //     return determineIfVoteAvailable(q.time_start, q.time_end);
  //   }
  // );

  // check if the member has a corresponding voting history with vote
  // const checkIfVoted = votingHistory.filter((v) => {
  //   return v.vote_id === availableQuestion?.uuid;
  // });

  // TODO: come back to this and figure out what's happening again...
  const checkIfVoted = {};
  const availableQuestion = false;

  return (
    <div className="flex justify-center w-full">
      {availableQuestion && Object.keys(checkIfVoted).length === 0 ? (
        <Question question={availableQuestion} />
      ) : (
        <span className="font-bold text-xl pt-10 font-montserrat">
          {" "}
          There is currently no live vote.
        </span>
      )}
    </div>
  );
};
