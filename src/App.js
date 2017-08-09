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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  align-items: center;
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
  grid-column: 1 / span 2;
  grid-row: 2;
  align-self: start;
  padding: 1rem;
`;

const TranslationContainer = styled.section`
  grid-column: 3 / span 2;
  grid-row: 2;
  align-self: start;
  padding: 1rem;
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
