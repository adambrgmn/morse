import React from 'react';
import styled from 'styled-components';

const Container = styled.div`width: 12.5rem;`;

const Svg = styled.svg`
  display: block;
  fill: #363636;
  stroke: #363636;
  stroke-width: 1;
`

const coords = [
  { x: 0, y: 40 },
  { x: 0, y: 30 },
  { x: 0, y: 10 },
  { x: 0, y: 0 },
  { x: 10, y: 10 },
  { x: 20, y: 0 },
  { x: 20, y: 10 },
  { x: 20, y: 30 },
  { x: 0, y: 20 },
  { x: 20, y: 20 },
  { x: 20, y: 40 },
  { x: 40, y: 30 },
  { x: 40, y: 20 },
  { x: 50, y: 0 },
  { x: 60, y: 20 },
  { x: 40, y: 10 },
  { x: 60, y: 10 },
  { x: 60, y: 30 },
  { x: 50, y: 40 },
  { x: 80, y: 40 },
  { x: 80, y: 30 },
  { x: 80, y: 20 },
  { x: 80, y: 0 },
  { x: 90, y: 0 },
  { x: 100, y: 0 },
  { x: 80, y: 10 },
  { x: 100, y: 10 },
  { x: 100, y: 40 },
  { x: 90, y: 20 },
  { x: 100, y: 30 },
  { x: 120, y: 40 },
  { x: 130, y: 40 },
  { x: 140, y: 40 },
  { x: 130, y: 20 },
  { x: 120, y: 10 },
  { x: 140, y: 30 },
  { x: 120, y: 0 },
  { x: 130, y: 0 },
  { x: 140, y: 0 },
  { x: 160, y: 0 },
  { x: 170, y: 0 },
  { x: 180, y: 0 },
  { x: 160, y: 10 },
  { x: 160, y: 20 },
  { x: 170, y: 20 },
  { x: 160, y: 30 },
  { x: 160, y: 40 },
  { x: 170, y: 40 },
  { x: 180, y: 40 },
];

export default () =>
  <Container>
    <Svg viewBox="0 0 190 50">
      <title>Morse</title>
      <desc>Morse logotype</desc>
      {coords.map(({ x, y }, i) =>
        <rect key={x * y + i} x={x} y={y} width="10" height="10" />,
      )}
    </Svg>
  </Container>;
