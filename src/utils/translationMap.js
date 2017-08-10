// @flow
import R, { cond, equals, always, T } from 'ramda';

const charMap = [
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

export const toChar = (code: string) =>
  R.pipe(R.find(R.pipe(R.head, R.equals(code))), R.propOr('😢', 1))(charMap);

export const toMorse = (char: string) =>
  R.pipe(R.find(R.pipe(R.last, R.equals(char))), R.propOr('😢', 0))(charMap);
