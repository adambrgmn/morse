// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  newLong,
  newShort,
  newChar,
  newWord,
  back,
  clear,
} from '../../reducer';

const Button = styled.button`
  display: inline-block;
  height: 1rem;
  margin-right: 1rem;
  border: none;
  border-radius: 0;
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1rem;
  color: #363636;
  background-color: transparent;
  transition: color 0.3s cubic-bezier(.455, .03, .515, .955);
  cursor: pointer;

  &:hover {
    color: #00f;
  }
`;

const ButtonMorse = styled(Button)`
  width: ${props => (props.long ? 3 : 1)}rem;
  text-indent: -9999px;
  background-color: #363636;
  transition-property: background;

  &:hover {
    background-color: #00f;
  }
`;

const Buttons = ({ dispatch }) =>
  <div>
    <ButtonMorse type="button" long onClick={() => dispatch(newLong())}>
      Long
    </ButtonMorse>
    <ButtonMorse type="button" short onClick={() => dispatch(newShort())}>
      Short
    </ButtonMorse>
    <Button type="button" onClick={() => dispatch(newChar())}>
      New charachter
    </Button>
    <Button type="button" onClick={() => dispatch(newWord())}>
      New word
    </Button>
    <Button type="button" onClick={() => dispatch(back())}>
      Back
    </Button>
    <Button type="button" onClick={() => dispatch(clear())}>
      Clear
    </Button>
  </div>;

export default connect()(Buttons);
