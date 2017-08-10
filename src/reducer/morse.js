// @flow
import R from 'ramda';
import uuid from 'uuid/v1';

export const NEW_LONG = 'NEW_LONG';
export const NEW_SHORT = 'NEW_SHORT';
export const NEW_CHAR = 'NEW_CHAR';
export const NEW_WORD = 'NEW_WORD';
export const BACK = 'BACK';
export const CLEAR = 'CLEAR';
export const TOGGLE_BREAKCHAR = 'TOGGLE_BREAKCHAR';

type Char = { id: string, type: 'char', code: string };
type Break = { id: string, type: 'break', long: boolean };

type State = Array<Char | Break>;
type Action = { type: string };

const initialState = [
  { id: uuid(), type: 'char', code: '...' },
  { id: uuid(), type: 'break', long: false },
  { id: uuid(), type: 'char', code: '---' },
  { id: uuid(), type: 'break', long: true },
  { id: uuid(), type: 'char', code: '...' },
];

const createNewCharObj = code => ({ id: uuid(), type: 'char', code });
const createNewBreakObj = long => ({ id: uuid(), type: 'break', long });

const lastIsBreak = R.pipe(
  R.last,
  R.propOr('break', 'type'),
  R.equals('break'),
);
const lastIsEmpty = R.pipe(R.last, R.prop('code'), R.isEmpty);

const addNewCharObj = char => R.append(createNewCharObj(char));
const updateLastChar = fn =>
  R.over(R.lensIndex(-1), R.over(R.lensProp('code'), fn));

const addChar = char =>
  R.cond([
    [lastIsBreak, addNewCharObj(char)],
    [R.T, updateLastChar(R.flip(R.concat)(char))],
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
  R.cond([[lastIsEmpty, R.empty], [R.T, R.identity]]),
);

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case NEW_LONG:
      return addChar('-')(state);

    case NEW_SHORT:
      return addChar('.')(state);

    case NEW_CHAR:
      return addCharBreak(state);

    case NEW_WORD:
      return addCharBreak(addCharBreak(state));

    case BACK:
      return backspace(state);

    case CLEAR:
      return [];

    default:
      return state;
  }
};
