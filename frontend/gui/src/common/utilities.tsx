import {CommunicationAction, CommunicationState} from "./constants";

export const updateCommunicationState = (
  state: CommunicationState,
  action: CommunicationAction
) => {
  const index = state.findIndex(({ type }) => type === action.type);
  if (index >= 0) {
      state[index] = action;
  } else {
      state.push(action);
  }
};  