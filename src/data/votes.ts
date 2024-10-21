import { VoteQuestions } from "../util/Types";

export const mockVoteQuestions: VoteQuestions[] = [
  // For now comment/uncomment this question out for testing whether a vote exists or not
  {
    uuid: "1",
    question: "Do you want to implement the new SGA website",
    description: "Subtext here blah blah blah",
    // yearlong ex: for something that should start now:
    time_start: new Date("2024-01-01 00:00:00"),
    time_end: new Date("2024-12-31 23:59:59"),
  },
  {
    uuid: "2",
    question: "Another Vote Example in the future",
    // random idk
    time_start: new Date("2023-12-25 18:15:23"),
    time_end: new Date("2023-12-25 20:30:54"),
  },
];

// export const mockVoteHistory: VoteHistory[] = [
//   {
//     member_id: "1",
//     vote_id: "1",
//     vote_selection: VoteSelection.YES,
//   },
//   // For now comment/uncomment this member out for testing whether we have already voted or not
//   {
//     member_id: "2",
//     vote_id: "1",
//     vote_selection: VoteSelection.NO,
//   },
// ];
