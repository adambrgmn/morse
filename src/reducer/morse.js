// @flow
import R from 'ramda';
import uuid from 'uuid/v1';

import { toMorse } from '../utils/translationMap';

export const NEW_LONG = 'NEW_LONG';
export const NEW_SHORT = 'NEW_SHORT';
export const NEW_CHAR = 'NEW_CHAR';
export const NEW_CHAR_BREAK = 'NEW_CHAR_BREAK';
export const NEW_WORD_BREAK = 'NEW_WORD_BREAK';
export const BACK = 'BACK';
export const CLEAR = 'CLEAR';
export const TOGGLE_BREAKCHAR = 'TOGGLE_BREAKCHAR';

type Char = { id: string, type: 'char', code: string };
type Break = { id: string, type: 'break', long: boolean };

type State = Array<Char | Break>;
type Action = { type: string, payload?: string };

const initialState = [
  { id: uuid(), type: 'char', code: '.-..' },
  { id: uuid(), type: 'break', long: false },
  { id: uuid(), type: 'char', code: '---' },
  { id: uuid(), type: 'break', long: false },
  { id: uuid(), type: 'char', code: '.-..' },
];

const createNewUnitObj = code => ({ id: uuid(), type: 'char', code });
const createNewBreakObj = long => ({ id: uuid(), type: 'break', long });

const lastIsBreak = R.pipe(
  R.last,
  R.propOr('break', 'type'),
  R.equals('break'),
);
const lastIsEmpty = R.pipe(R.last, R.prop('code'), R.isEmpty);

const addNewUnitObj = char => R.append(createNewUnitObj(char));
const updateLastUnit = fn =>
  R.over(R.lensIndex(-1), R.over(R.lensProp('code'), fn));

const addUnit = unit =>
  R.cond([
    [lastIsBreak, addNewUnitObj(unit)],
    [R.T, updateLastUnit(R.flip(R.concat)(unit))],
  ]);

const addNewCharBreakObj = arr => R.append(createNewBreakObj(false), arr);
const updateLastCharBreak = R.over(
  R.lensIndex(-1),
  R.over(R.lensProp('long'), R.T),
);

const addCharBreak = R.cond([
  [R.isEmpty, R.identity],
  [lastIsBreak, updateLastCharBreak],
  [R.T, addNewCharBreakObj],
]);

const backLastChar = R.over(
  R.lensIndex(-1),
  R.over(R.lensProp('code'), R.slice(0, -1)),
);

const backspace = R.pipe(
  R.cond([[lastIsBreak, R.init], [R.T, backLastChar]]),
  R.cond([[lastIsEmpty, R.init], [R.T, R.identity]]),
);

const addChar = char =>
  R.cond([
    [lastIsBreak, addNewUnitObj(toMorse(char))],
    [R.T, R.pipe(addNewCharBreakObj, addNewUnitObj(toMorse(char)))],
  ]);

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case NEW_LONG:
      return addUnit('-')(state);

    case NEW_SHORT:
      return addUnit('.')(state);

    case NEW_CHAR:
      if (!action.payload) return state;
      return addChar(action.payload)(state);

    case NEW_CHAR_BREAK:
      return addCharBreak(state);

    case NEW_WORD_BREAK:
      return addCharBreak(addCharBreak(state));

    case BACK:
      return backspace(state);

    case CLEAR:
      return [];

    default:
      return state;
  }
};
