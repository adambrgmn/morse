// @flow

export const HIGHLIGHT_ID = 'HIGHLIGHT_ID';
export const RESET_HIGHLIGHT = 'RESET_HIGHLIGHT';

type State = ?string;
type Action = {
  type: string,
  payload?: string,
};

export default (state: State = null, action: Action) => {
  switch (action.type) {
    case HIGHLIGHT_ID:
      return action.payload;
    case RESET_HIGHLIGHT:
      return null;
    default:
      return state;
  }
};
