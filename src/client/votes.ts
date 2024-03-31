import { VoteHistory } from "../util/Types";
import { api } from "./login";

// needs the props
export const createVote = async (voteCreated: VoteHistory) => {
  const response = await api.post("voting/createVote", voteCreated);
  return response.data;
};

// export const getIfMemberVoted = (uuid: string, vid: string) => {};

export const getMemberVotingRecord = async (uuid: string) => {
  const response = await api.get("/voting/getVotingForMember", {
    params: {
      member_id: uuid,
    },
  });
  return response.data;
};

export const getQuestionsAvailable = async () => {
  const response = await api.get("/voting/getAllQuestions");
  return response.data;
};
