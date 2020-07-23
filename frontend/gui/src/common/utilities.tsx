import {ICommunicationAction, CommunicationState} from "./constants";

export const updateCommunicationState = (
  state: CommunicationState,
  action: ICommunicationAction
) => {
  const index = state.findIndex(({ type }) => type === action.type);
  if (index >= 0) {
      state[index] = action;
  } else {
      state.push(action);
  }
};  