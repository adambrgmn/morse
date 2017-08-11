// @flow
import {
  ifElse,
  isEmpty,
  T,
  pipe,
  last,
  prop,
  equals,
  append,
  over,
  lensIndex,
  lensProp,
  cond,
  flip,
  concat,
  identity,
  slice,
  init,
} from 'ramda';
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

const lastIsBreak = ifElse(
  isEmpty,
  T,
  pipe(last, prop('type'), equals('break')),
);

const lastIsEmpty = pipe(last, prop('code'), isEmpty);

const addNewUnitObj = char => append(createNewUnitObj(char));
const updateLastUnit = fn => over(lensIndex(-1), over(lensProp('code'), fn));

const addUnit = unit =>
  cond([
    [lastIsBreak, addNewUnitObj(unit)],
    [T, updateLastUnit(flip(concat)(unit))],
  ]);

const addNewCharBreakObj = arr => append(createNewBreakObj(false), arr);
const updateLastCharBreak = over(lensIndex(-1), over(lensProp('long'), T));

const addCharBreak = cond([
  [isEmpty, identity],
  [lastIsBreak, updateLastCharBreak],
  [T, addNewCharBreakObj],
]);

const backLastChar = over(lensIndex(-1), over(lensProp('code'), slice(0, -1)));

const backspace = ifElse(
  isEmpty,
  identity,
  pipe(
    cond([[lastIsBreak, init], [T, backLastChar]]),
    cond([[lastIsEmpty, init], [T, identity]]),
  ),
);

const addChar = char =>
  cond([
    [lastIsBreak, addNewUnitObj(toMorse(char))],
    [T, pipe(addNewCharBreakObj, addNewUnitObj(toMorse(char)))],
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
      return pipe(addCharBreak, addCharBreak)(state);

    case BACK:
      return backspace(state);

    case CLEAR:
      return [];

    default:
      return state;
  }
};
