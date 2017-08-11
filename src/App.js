// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import Logotype from './components/Logotype';
import Buttons from './components/Buttons';
import Morse from './components/Morse';
import Translation from './components/Translation';
import Listen from './components/Listen';

const GridContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 1fr 1fr;
  align-items: center;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.bg};
`;

const HeaderContainer = styled.header`
  grid-column: 1;
  grid-row: 1;
  padding: 1rem;
`;

const ButtonContainer = styled.section`
  grid-column: 2 / span 4;
  grid-row: 1;
  padding: 1rem;
`;

const MorseContainer = styled.section`
  position: relative;
  grid-column: 1 / span 4;
  grid-row: 2;
  align-self: end;
  width: 100%;
  padding: 1rem;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    top: calc(100% - 3px);
    left: 37.5%;
    width: 25%;
    height: 3px;
    background-color: ${({ theme }) => theme.color.brand};
  }
`;

const TranslationContainer = styled.section`
  grid-column: 1 / span 4;
  grid-row: 3;
  align-self: start;
  width: 100%;
  padding: 1rem;
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <GridContainer>
        <HeaderContainer>
          <Logotype />
        </HeaderContainer>

        <ButtonContainer>
          <Buttons />
        </ButtonContainer>

        <MorseContainer>
          <Morse />
        </MorseContainer>

        <TranslationContainer>
          <Translation />
        </TranslationContainer>
        <Listen />
      </GridContainer>
    );
  }
}

export default App;
