import { ReactElement } from "react";

// TODO: also interesting case if we maybe have two questions at the same time/ choose the most recent/first one that we find

// this page will load two things the vote questions, the votes the logged in user made
// if we have a live vote/ the times overlap, and we have not already casted a vote for this i.e can't find within the list
// display prompt to submit a vote
// else show that we have no vote ready (Outer Ternary Operator)

// when we also load in the values -> we should pass those values into the component beneath us to use for the history component
// idk how I'll figure out how to do that, but want that to happen

// once the data is loaded in: show the prompt to make a vote
// allow the selection using useStates
// keep track of whether we have submitted (eventually a useMutation hook)
// once we have submitted show a different screen/component
// then eventually consider how this will look across all screens :)

export const VotingPage = (): ReactElement => {
  // TODO: web sockets and live display of member votes, focus on creating a vote, based on a system
  // then showing the results
  // TODO: also for this screen ask to authenticate one more time befor entering

  // Then Reach here:
  // first fetch all the votes within the table to see if there is a vote available

  // if there is nothing available: other screen

  // if there is a vote available:
  // show the screen to cast a vote for that specific vote uuid:

  // 3 basic optioned select and the value depending on select -> set a value here: then cast the vote
  // upon submission i.e we know we have submitted -> navigate to another page/show somehow completed

  // stay within voting screen and navigate to another page wihthin this component :)
  // is submitted:

  // then once we submit we should not be able to come back

  return <>Hello World</>;
};
