import axios from "axios";
import { VoteSelection } from "../util/Types";

export const createVote = async (
  vote_id: string,
  member_id: string | undefined,
  vote_selection: VoteSelection
) => {
  const response = await axios.post("api/voting/createVote", {
    member_id,
    vote_id,
    vote_selection,
  });

  return response.data;
};
