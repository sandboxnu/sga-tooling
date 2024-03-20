import { ReactElement, useContext, useState } from "react";
import { LoginContext } from "../App";
import { fetchMember, getAllQuestions, getMemberVotes } from "../client/client";
import Loading from "../components/Loading";
import { Question } from "../components/Question";
import { Member, VoteHistory, VoteQuestions } from "../util/Types";

// TODO: also interesting case if we maybe have two questions at the same time/ choose the most recent/first one that we find
// this page will load two things the vote questions, the votes the logged in user made
// if we have a live vote/ the times overlap, and we have not already casted a vote for this i.e can't find within the list
// display prompt to submit a vote
// else show that we have no vote ready (Outer Ternary Operator)

// when we also load in the values -> we should pass those values into the component beneath us to use for the history component
// idk how I'll figure out how to do that, but want that to happen

// once the data is loaded in: show the prompt to make a vote
// allow the selection using useStates
// keep track of whether we have submitted (eventually a useMutation hook)
// once we have submitted show a different screen/component
// then eventually consider how this will look across all screens :)

// as always when something fails/cannot fetch make sure to show the error compoenent

const determineIfVoteAvailable = (time_start: Date, time_end: Date) => {
  // given two inputs find whether we are within the time range to show the dates:
  const today = new Date();
  return today >= time_start && today <= time_end;
};

export const VotingPage = (): ReactElement => {
  // TODO: web sockets and live display of member votes, focus on creating a vote, based on a system
  // then showing the results
  // TODO: also for this screen ask to authenticate one more time befor entering

  // Then Reach here:
  const { userID } = useContext(LoginContext);
  // fetch both the Voting History and the Questions to be proposed:
  const [votingHistory, setVotingHistory] = useState<VoteHistory[]>([]);
  const [totalQuestions, setQuestions] = useState<VoteQuestions[]>();
  const [member, setMember] = useState<Member>();
  // for now undefined

  // this will be better handled in a reactQuery funtion
  const fetchNecessaryItems = async () => {
    // on load fetch each of the components:
    const member = await fetchMember(userID!);
    setMember(member);
    // from the memebrs use their ID:
    const votingRecords = await getMemberVotes(member?.id!);
    setVotingHistory(votingRecords);
    // with the memberID -> get their voting History
    const questionsInQueue = await getAllQuestions();
    return questionsInQueue;
  };

  // quick cheat to get the Loading Component while these fetch:
  if (!totalQuestions) {
    fetchNecessaryItems().then((q) => {
      setQuestions(q);
    });
    return <Loading />;
  }

  // find if we have a question:
  const isValidQuestion: VoteQuestions | undefined = totalQuestions.find(
    (q) => {
      return determineIfVoteAvailable(q.time_start, q.time_end);
    }
  );

  return (
    <div>
      {isValidQuestion ? (
        <Question question={isValidQuestion} />
      ) : (
        <>We don't have a question</>
      )}
    </div>
  );
};
