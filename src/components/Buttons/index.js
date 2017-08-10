// @flow
import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import {
  newLong,
  newShort,
  newCharBreak,
  newWordBreak,
  back,
  clear,
} from '../../reducer';

const Button = styled.button`
  display: inline-block;
  height: 1em;
  margin-right: 2em;
  border: none;
  border-radius: 0;
  font-family: ${props => props.theme.font.family};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1rem;
  color: ${({ theme }) => theme.color.black};
  background-color: transparent;
  transition: ${({ theme }) => theme.transition('color')};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.brand};
  }
`;

const ButtonMorse = styled(Button)`
  width: ${props => (props.long ? 3 : 1)}rem;
  text-indent: -9999px;
  background-color: ${({ theme }) => theme.color.black};
  transition-property: background;

  &:hover {
    background-color: ${({ theme }) => theme.color.brand};
  }

  &:first-child { margin-right: 1em; }

  ${props => !props.long && css`border-radius: 100%;`}
`;

const Buttons = ({ dispatch }) =>
  <div>
    <ButtonMorse type="button" long onClick={() => dispatch(newLong())}>
      Long
    </ButtonMorse>
    <ButtonMorse type="button" short onClick={() => dispatch(newShort())}>
      Short
    </ButtonMorse>
    <Button type="button" onClick={() => dispatch(newCharBreak())}>
      New charachter
    </Button>
    <Button type="button" onClick={() => dispatch(newWordBreak())}>
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
