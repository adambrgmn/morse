import React from 'react';
import styled from 'styled-components';
import R from 'ramda';
import { connect } from 'react-redux';

const TranslationContainer = styled.p`
  font-size: 3rem;
  font-family: 'Roboto Mono', monospace;
  line-height: 1;
  text-transform: uppercase;
`;

const translationMap = R.cond([
  [R.equals('.-'), R.always('a')],
  [R.equals('-...'), R.always('b')],
  [R.equals('-.-.'), R.always('c')],
  [R.equals('-..'), R.always('d')],
  [R.equals('.'), R.always('e')],
  [R.equals('..-.'), R.always('f')],
  [R.equals('--.'), R.always('g')],
  [R.equals('....'), R.always('h')],
  [R.equals('..'), R.always('i')],
  [R.equals('.---'), R.always('j')],
  [R.equals('-.-'), R.always('k')],
  [R.equals('.-..'), R.always('l')],
  [R.equals('--'), R.always('m')],
  [R.equals('-.'), R.always('n')],
  [R.equals('---'), R.always('o')],
  [R.equals('.--.'), R.always('p')],
  [R.equals('--.-'), R.always('q')],
  [R.equals('.-.'), R.always('r')],
  [R.equals('...'), R.always('s')],
  [R.equals('-'), R.always('t')],
  [R.equals('..-'), R.always('u')],
  [R.equals('...-'), R.always('v')],
  [R.equals('.--'), R.always('w')],
  [R.equals('-..-'), R.always('x')],
  [R.equals('-.--'), R.always('y')],
  [R.equals('--..'), R.always('z')],
  [R.equals('.----'), R.always('1')],
  [R.equals('..---'), R.always('2')],
  [R.equals('...--'), R.always('3')],
  [R.equals('....-'), R.always('4')],
  [R.equals('.....'), R.always('5')],
  [R.equals('-....'), R.always('6')],
  [R.equals('--...'), R.always('7')],
  [R.equals('---..'), R.always('8')],
  [R.equals('----.'), R.always('9')],
  [R.equals('-----'), R.always('0')],
  [R.equals(''), R.always('')],
  [R.T, R.always('😢')],
]);

const Translation = R.pipe(
  R.prop('morseString'), // '... --- ...  -----'
  R.split('  '), // ['... --- ...', '-----']
  R.map(R.split(' ')), // [['...', '---', '...'], ['-----']]
  R.map(
    R.pipe(
      R.map(translationMap), // [['s', 'o', 's'], ['0']]
      R.join(''), // ['sos', ['0']]
    ),
  ),
  R.join(' '), // 'sos 0'
  translation =>
    <TranslationContainer>
      {translation}
    </TranslationContainer>,
); // { morseString: '... --- ...  -----' }

const mapStatToProps = state => state;

export default connect(mapStatToProps)(Translation);
