// @flow
import { combineReducers } from 'redux';
import morse from './morse';

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

export default combineReducers({
  morse,
})
