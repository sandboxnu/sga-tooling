import { ReactElement } from "react";
import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/Loading";
import { VoteHistoryRow } from "../components/VoteHistoryRow";
import { useAuth } from "../hooks/useAuth";
import useVotingRecord from "../hooks/useVotingRecord";

export const VotingHistory = (): ReactElement => {
  const { member } = useAuth();
  const {
    status,
    data: votehistory,
    error,
    isFetching,
  } = useVotingRecord(member?.id);

  if (isFetching) {
    return <Loading />;
  } else if (status === "error") {
    return <ErrorComponent />;
  } else if (votehistory) {
    return (
      <div className="flex justify-center py-10 w-3/4 mx-20 lg:mx-60">
        <div className="flex flex-col space-y-4 min-w-full">
          <div className="flex justify-between">
            <div className="font-bold">Question</div>
            <div className="font-bold text-right">Vote</div>
          </div>

          {votehistory.length === 0 ? (
            <span> No Voting Records to Display </span>
          ) : (
            votehistory.map((voteRow) => <VoteHistoryRow voteRow={voteRow} />)
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default VotingHistory;
