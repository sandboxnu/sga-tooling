import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { LoginContext } from "../App";
import { getMemberVotingRecord } from "../client/votes";
import { VoteHistory } from "../util/Types";

export const PastVotes = () => {
  const { userID } = useContext(LoginContext);
  // needs to fetch the member's Voting History Records
  // Then Needs to make a table in a way that renders each thing

  const {
    data: votingHistory,
    isPending: votesPending,
    isError: votesError,
  } = useQuery<VoteHistory[]>({
    queryFn: () => getMemberVotingRecord(userID!),
    queryKey: ["api", "voting", "history", { userID }],
  });

  /*
  Although I already call these function so caching exists, seems redundant to this again...
  */

  // styling define the maxWidth of outside container
  // flex columns
  // each a flex row
  // set a maxWidth?? for each width of the question text so that there leaves a gap

  return <></>;
};
