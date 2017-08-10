import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import translationMap from './translationMap';
import { highlightId, resetHighlight } from '../../reducer';

const TranslationContainer = styled.p`
  font-size: 3rem;
  font-family: 'Roboto Mono', monospace;
  line-height: 1;
  text-transform: uppercase;
`;

const Translation = ({ morse, dispatch }) =>
  <TranslationContainer>
    {morse.map(entity =>
      <span
        key={entity.id}
        onMouseEnter={() => dispatch(highlightId(entity.id))}
        onMouseLeave={() => dispatch(resetHighlight())}>
        {entity.type === 'char'
          ? translationMap(entity.code)
          : entity.long ? ' ' : ''}
      </span>,
    )}
  </TranslationContainer>;

const mapStatToProps = state => state;

export default connect(mapStatToProps)(Translation);
