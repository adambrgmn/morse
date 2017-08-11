// @flow
import { pipe, find, contains, nth, ifElse, isNil, flip } from 'ramda';


type Char = [string, string];
const charMap: Char[] = [
  ['.-', 'a'],
  ['-...', 'b'],
  ['-.-.', 'c'],
  ['-..', 'd'],
  ['.', 'e'],
  ['..-.', 'f'],
  ['--.', 'g'],
  ['....', 'h'],
  ['..', 'i'],
  ['.---', 'j'],
  ['-.-', 'k'],
  ['.-..', 'l'],
  ['--', 'm'],
  ['-.', 'n'],
  ['---', 'o'],
  ['.--.', 'p'],
  ['--.-', 'q'],
  ['.-.', 'r'],
  ['...', 's'],
  ['-', 't'],
  ['..-', 'u'],
  ['...-', 'v'],
  ['.--', 'w'],
  ['-..-', 'x'],
  ['-.--', 'y'],
  ['--..', 'z'],
  ['.----', '1'],
  ['..---', '2'],
  ['...--', '3'],
  ['....-', '4'],
  ['.....', '5'],
  ['-....', '6'],
  ['--...', '7'],
  ['---..', '8'],
  ['----.', '9'],
  ['-----', '0'],
];

const findFlip = flip(find);
const translate = (idx: number): ((c: string) => string) =>
  pipe(contains, findFlip(charMap), ifElse(isNil, () => '😢', nth(idx)));

export const toChar = translate(1);
export const toMorse = translate(0);
