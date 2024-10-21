import { VoteHistory } from "../util/Types";
import { api } from "./login";

// needs the props
export const createVote = async (voteCreated: VoteHistory) => {
  const response = await api.post("voting/createVote", voteCreated);
  return response.data;
};

export const getMembersPastVotes = async (uuid: string) => {
  const response = await api.get("/voting/getPastVotes", {
    params: {
      id: uuid,
    },
  });
  return response.data;
};

export const getQuestionAvailable = async () => {
  const response = await api.get("/voting/getIfMemberVoted");
  return response.data;
};
