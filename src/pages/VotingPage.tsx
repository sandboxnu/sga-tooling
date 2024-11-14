import { ReactElement } from "react";
import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/Loading";
import { Question } from "../components/Question";
import { useAuth } from "../hooks/useAuth";
import useVoteQuestion from "../hooks/useVote";

export const VotingPage = (): ReactElement => {
  const { member } = useAuth();
  const {
    status,
    data: questions,
    error,
    isFetching,
  } = useVoteQuestion(member?.id);

  if (isFetching) {
    return <Loading />;
  } else if (status === "error") {
    return <ErrorComponent />;
  } else if (questions) {
    return (
      <div className="flex justify-center w-full p-10">
        {" "}
        {questions.length !== 0 ? (
          <Question question={questions[0]} member_id={member?.id} />
        ) : (
          <span className="font-bold text-xl pt-10 font-montserrat">
            {" "}
            There is currently no live vote.
          </span>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default VotingPage;
