import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createVote } from "../client/VotingClient";
import { VoteQuestion, VoteSelection } from "../util/Types";

interface QuestionProps {
  question: VoteQuestion;
  member_id: string | undefined;
}

export const Question = ({ question, member_id }: QuestionProps) => {
  const [selectedVote, setSelectedVote] = useState<VoteSelection>();
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const availableOptions = [
    { value: VoteSelection.YES, label: "Yes" },
    { value: VoteSelection.NO, label: "No" },
    { value: VoteSelection.ABSTAIN, label: "Abstain" },
  ];

  const getLabelFromSelection = (value: VoteSelection | undefined) => {
    return availableOptions.find((option) => option.value === value)?.label;
  };

  const createVoteMutation = useMutation({
    mutationFn: async (selectedVote: VoteSelection) => {
      return createVote(question.uuid, member_id, selectedVote);
    },
    onSuccess: () => {
      setSubmitted(true);
      // TODO: this success should update the voting history query however
      // this useMutation is setting the data too quickly to the point where
      // the submission message doesn't show
    },
  });

  const castVote = async (selectedVote: VoteSelection) => {
    createVoteMutation.mutateAsync(selectedVote).then((response) => {
      return response;
    });
  };

  return (
    <div className="font-montserrat">
      <div className="flex flex-col">
        <span className="font-bold text-xl">{question.question}</span>
        <span className="text-center p-3">{question.description}</span>
      </div>
      {submitted ? (
        <div className="text-lg pt-10 text-center">
          <span className="font-bold">Thank you for voting. </span>
          You voted: {getLabelFromSelection(selectedVote)}.
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col gap-6 pb-10">
            {error && <div>Please input a value before casting vote</div>}
            {availableOptions.map((option, index) => {
              return (
                <button
                  className={` border ${
                    selectedVote === option.value
                      ? "border-red-700 text-red-700"
                      : "border-black"
                  } rounded-md p-1 pl-4 font-bold text-lg font-montserrat text-left`}
                  value={option.value}
                  key={index}
                  onClick={() => {
                    setError(false);
                    setSelectedVote(option.value);
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <button
            className={`${
              selectedVote
                ? "bg-red-500 text-white"
                : "bg-atn-disabled atn-disabled-text border-atn-disabled"
            } button-base-red px-4 my-2 w-32 self-end`}
            onClick={() => {
              if (!selectedVote) {
                setError(true);
                return;
              } else {
                castVote(selectedVote);
              }
            }}
          >
            {" "}
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};
