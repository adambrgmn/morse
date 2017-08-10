// @flow
import { combineReducers } from 'redux';
import morse, {
  NEW_LONG,
  NEW_SHORT,
  NEW_CHAR,
  NEW_WORD,
  BACK,
  CLEAR,
} from './morse';
import highlight, { HIGHLIGHT_ID, RESET_HIGHLIGHT } from './highlight';

/**
 * ACTIONS
 */
export const newLong = () => ({ type: NEW_LONG });
export const newShort = () => ({ type: NEW_SHORT });
export const newChar = () => ({ type: NEW_CHAR });
export const newWord = () => ({ type: NEW_WORD });
export const back = () => ({ type: BACK });
export const clear = () => ({ type: CLEAR });
export const highlightId = (payload: string) => ({
  type: HIGHLIGHT_ID,
  payload,
});
export const resetHighlight = () => ({ type: RESET_HIGHLIGHT });
/**
 * REDUCER
 */

export default combineReducers({
  morse,
  highlight,
});
