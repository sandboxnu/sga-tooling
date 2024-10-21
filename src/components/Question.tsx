import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";
import { createVote } from "../client/votes";
import { VoteHistory, VoteQuestions, VoteSelection } from "../util/Types";

interface QuestionProps {
  question: VoteQuestions;
}

export const Question = ({ question }: QuestionProps) => {
  // fetch the member
  const { userID } = useContext(LoginContext);

  const [selectedVote, setSelectedVote] = useState<VoteSelection>();
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const availableOptions = [
    { value: VoteSelection.YES, label: "Yes" },
    { value: VoteSelection.NO, label: "No" },
    { value: VoteSelection.ABSTAIN, label: "Abstain" },
  ];

  const castVoteMutation = useMutation({
    mutationFn: async () => {
      if (!selectedVote) return;
      const createdVote: VoteHistory = {
        // member_id: userID!,
        // vote_id: question.uuid,
        question: "1", // id of the question???
        vote_selection: selectedVote,
      };
      console.log(createdVote);
      return createVote(createdVote);
    },
    onSuccess: () => {
      setSubmitted(true);
      /*
      TODO: invalidteQueries was updating this too quickly to where it wouldn't show the submit message afterwards
      Find a better way to do this updating/state
      queryClient.invalidateQueries({
        queryKey: ["api", "voting", "history", { userID }],
      });
      */
    },
  });

  const castVote = async () => {
    castVoteMutation.mutateAsync().then((response) => {
      return response;
    });
  };

  // if we are selected -> Red Text/Outline
  // need to make sure we are only selecting one option
  // need some loading state while the vote is pending (might be eaiser when React Query is invovled)

  return (
    <div>
      <div>{question.question}</div> <div>{question.description}</div>{" "}
      {submitted ? (
        <div>
          <div>Thank you for voting. You voted {selectedVote}</div>
          <Link to={`/events`}>Return back to HomePage</Link>
        </div>
      ) : (
        <div>
          {error && <div>Please input a value before casting vote</div>}
          {availableOptions.map((option, index) => {
            return (
              <button
                className={` border ${
                  selectedVote === option.value
                    ? "border-red-700"
                    : "border-black"
                }`}
                value={option.value}
                key={index}
                onClick={() => {
                  setSelectedVote(option.value);
                }}
              >
                {option.label}
              </button>
            );
          })}
          <button
            className={`${
              selectedVote
                ? "bg-red-500 text-white"
                : "bg-atn-disabled atn-disabled-text"
            } `}
            onClick={() => castVote()}
          >
            {" "}
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
