import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VoteQuestion } from "../util/Types";

export default function useVoteQuestion(id: string | undefined) {
  return useQuery({
    queryKey: ["voting", id],
    queryFn: async (): Promise<VoteQuestion[]> => {
      const response = await axios.get<VoteQuestion[]>(
        `/api/voting/getIfMemberVoted?id=${id}`
      );

      return response.data;
    },
  });
}
