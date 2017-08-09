// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import R from 'ramda';

// prettier-ignore
const MorseUnit = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
  margin: 1em 0;
  margin-right: 1em;
  background-color: #363636;

  ${props => props.long && css`
    width: 3em;
  `}

  ${props => props.break && css`
    position: relative;
    background-color: transparent;

    &::before {
      content: '';
      position: absolute;
      top: 0.25em;
      right: 0.25em;
      width: calc(100% - 0.5em);
      height: calc(100% - 0.5em);
      background-color: ${() => props.showBreakChars ? '#eee' : 'transparent'};
  `}

  &:last-child {
    margin-right: 0;
  }
`;

type Props = {
  morseString: string,
  showBreakChars: boolean,
};

const createElement = R.curry(R.nAry(2, React.createElement));

const buildUnits = showBreakChars => R.pipe(
  R.match(/(\.|-|\s+)/g),
  R.map(
    R.applySpec({
      key: Math.random,
      long: R.anyPass([R.equals('-'), R.equals('  ')]),
      break: R.test(/\s/),
      showBreakChars: R.always(showBreakChars),
    }),
  ),
  R.map(createElement(MorseUnit)),
);

const Morse = ({ morseString, showBreakChars }: Props) =>
  <div>
    {buildUnits(showBreakChars)(morseString)}
  </div>;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Morse);
