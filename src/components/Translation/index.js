import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { toChar } from '../../utils/translationMap';
import { highlightId, resetHighlight } from '../../reducer';

const TranslationContainer = styled.p`
  font-size: 3rem;
  font-family: ${props => props.theme.font};
  line-height: 1;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.color.brand};
`;

const TranslationChar = styled.span`
  cursor: default;
  transition: ${({ theme }) => theme.transition('color')};

  ${props => props.highlight && css`color: ${props.theme.color.black};`}
`;

const Translation = ({ morse, highlight, dispatch }) =>
  <TranslationContainer>
    {morse.map(entity =>
      <TranslationChar
        key={entity.id}
        onMouseEnter={() => dispatch(highlightId(entity.id))}
        onMouseLeave={() => dispatch(resetHighlight())}
        highlight={highlight === entity.id}>
        {entity.type === 'char'
          ? toChar(entity.code)
          : entity.long ? ' ' : ''}
      </TranslationChar>,
    )}
  </TranslationContainer>;

const mapStatToProps = state => state;

export default connect(mapStatToProps)(Translation);
