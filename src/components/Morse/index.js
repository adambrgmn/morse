// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

// prettier-ignore
const MorseChar = styled.div`
  display: inline-block;
  margin-right: 1em;
  margin-bottom: 1em;

  &:last-child { margin-right: 0; }

  ${props => props.highlight && css`
    & div { background-color: #00f; }
  `}
`;

// prettier-ignore
const MorseUnit = styled.div`
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 1em;
  border-radius: 100%;
  background-color: #363636;

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
    background-color: #eee;
  }
`;

const Morse = ({ morse, highlight }) =>
  <div>
    {morse.map(entity => {
      switch (entity.type) {
        case 'break':
          return <MorseBreak key={entity.id} long={entity.long} />;

        case 'char':
          const units = entity.code.split('');
          return (
            <MorseChar key={entity.id} highlight={entity.id === highlight}>
              {units.map((unit, i) =>
                <MorseUnit key={entity.id + i} unit={unit} />,
              )}
            </MorseChar>
          );
        // return units.map((unit, i) =>
        //   <MorseUnit key={entity.id + i} unit={unit} />,
        // );

        default:
          return null;
      }
    })}
  </div>;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Morse);
