// @flow

/**
 * TYPES
 */

export const NEW_LONG = 'NEW_LONG';
export const NEW_SHORT = 'NEW_SHORT';
export const NEW_CHAR = 'NEW_CHAR';
export const NEW_WORD = 'NEW_WORD';
export const BACK = 'BACK';
export const CLEAR = 'CLEAR';
export const TOGGLE_BREAKCHAR = 'TOGGLE_BREAKCHAR';

export const LONG = '-';
export const SHORT = '.';
export const CHAR_BREAK = ' ';
export const WORD_BREAK = '  ';


/**
 * ACTIONS
 */
export const newLong = () => ({ type: NEW_LONG });
export const newShort = () => ({ type: NEW_SHORT });
export const newChar = () => ({ type: NEW_CHAR });
export const newWord = () => ({ type: NEW_WORD });
export const back = () => ({ type: BACK });
export const clear = () => ({ type: CLEAR });
export const toggleBreakchar = () => ({ type: TOGGLE_BREAKCHAR });


/**
 * REDUCER
 */
type State = {
  morseString: string,
  showBreakChars: boolean,
};

type Action = { type: string };

const initialState: State = {
  morseString: '... --- ...  .. -- ..',
  showBreakChars: true,
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case NEW_LONG:
      return { ...state, morseString: state.morseString + LONG };

    case NEW_SHORT:
      return { ...state, morseString: state.morseString + SHORT };

    case NEW_CHAR:
      return { ...state, morseString: state.morseString + CHAR_BREAK };

    case NEW_WORD:
      return { ...state, morseString: state.morseString + WORD_BREAK };

    case BACK:
      return {
        ...state,
        morseString: state.morseString.substring(
          0,
          state.morseString.length - 1,
        ),
      };

    case CLEAR:
      return { ...state, morseString: '' };

    case TOGGLE_BREAKCHAR:
      return { ...state, showBreakChars: !state.showBreakChars };

    default:
      return state;
  }
};
