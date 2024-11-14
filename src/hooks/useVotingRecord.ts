import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VoteHistory } from "../util/Types";

export default function useVotingRecord(id: string | undefined) {
  return useQuery({
    queryKey: ["voting", "history", id],
    queryFn: async (): Promise<VoteHistory[]> => {
      const response = await axios.get<VoteHistory[]>(
        `/api/voting/getVotingRecord?id=${id}`
      );

      return response.data;
    },
  });
}
