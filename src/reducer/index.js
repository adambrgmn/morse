// @flow
import { combineReducers } from 'redux';
import morse, {
  NEW_LONG,
  NEW_SHORT,
  NEW_CHAR,
  NEW_CHAR_BREAK,
  NEW_WORD_BREAK,
  BACK,
  CLEAR,
} from './morse';
import highlight, { HIGHLIGHT_ID, RESET_HIGHLIGHT } from './highlight';

/**
 * ACTIONS
 */
export const newLong = () => ({ type: NEW_LONG });
export const newShort = () => ({ type: NEW_SHORT });
export const newChar = (payload: string) => ({ type: NEW_CHAR, payload });
export const newCharBreak = () => ({ type: NEW_CHAR_BREAK });
export const newWordBreak = () => ({ type: NEW_WORD_BREAK });
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
