// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { highlightId, resetHighlight } from '../../reducer';

// prettier-ignore
const MorseChar = styled.div`
  display: inline-block;
  margin-right: 1em;
  &:last-child { margin-right: 0; }

  ${props => props.highlight && css`
    & div { background-color: ${({ theme }) => theme.color.black}; }
  `}
`;

// prettier-ignore
const MorseUnit = styled.div`
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  margin: 1em 0;
  margin-right: 1em;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.brand};
  transition: ${({ theme }) => theme.transition('background')};

  &:last-child { margin-right: 0; }

  ${props => props.unit === '-' && css`
    width: 3em;
    border-radius: 0;
  `}
`;

// prettier-ignore
const MorseBreak = styled(MorseUnit)`
  width: 3em;
  background-color: transparent;

  ${props => props.long && css`
    width: 7em;
  `}

  &::after {
    content: '';
    position: absolute;
    top: 0.25em;
    left: 0.25em;
    width: calc(100% - 0.5em);
    height: calc(100% - 0.5em);
    background-color: ${({ theme }) => theme.color.brand};
    opacity: 0.1;
  }
`;

const Morse = ({ morse, highlight, dispatch }) =>
  <div style={{ display: 'inline-block', maxWidth: '60em' }}>
    {morse.map(entity => {
      switch (entity.type) {
        case 'break':
          return <MorseBreak key={entity.id} long={entity.long} />;

        case 'char':
          const units = entity.code.split('');
          return (
            <MorseChar
              key={entity.id}
              highlight={entity.id === highlight}
              onMouseEnter={() => dispatch(highlightId(entity.id))}
              onMouseLeave={() => dispatch(resetHighlight())}>
              {units.map((unit, i) =>
                <MorseUnit key={entity.id + i} unit={unit} />,
              )}
            </MorseChar>
          );

        default:
          return null;
      }
    })}
  </div>;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Morse);
