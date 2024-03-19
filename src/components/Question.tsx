import { useState } from "react";
import { Link } from "react-router-dom";
import { createVote } from "../client/client";
import { VoteQuestions, VoteSelection } from "../util/Types";

interface QuestionProps {
  question: VoteQuestions;
}

export const Question = ({ question }: QuestionProps) => {
  // keep track of the state of the selection here, and the inpts
  // TODO: in here would probably read the member from context, but weird stuff going on so gonna pass by props
  // is it safe to pass props like the id of the vote?

  const [selectedVote, setSelectedVote] = useState<VoteSelection>();
  const [error, setError] = useState(false);
  // not sure if error is needed, but if we don't select we are disabled:
  const [submitted, setSubmitted] = useState(false);

  const availableOptions = [
    { value: VoteSelection.YES, label: "Yes" },
    { value: VoteSelection.NO, label: "No" },
    { value: VoteSelection.ABSTAIN, label: "Abstain" },
  ];

  // TODO: in the upcoming version there needs to be error handling and what not...
  const castVote = async () => {
    if (selectedVote) {
      await createVote("1", question.id, selectedVote);
      setSubmitted(true);
    } else {
      setError(true);
    }
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
