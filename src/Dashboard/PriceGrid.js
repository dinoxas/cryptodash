import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import PriceTile from './PriceTile';

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  margin-top: 2rem;
`;

export default function () {
  return (
    <AppContext.Consumer>
      {({ prices }) => (
        <PriceGrid>
          {prices.map((price, index) => (
            <PriceTile price={price} index={index} key={index} />
          ))}
        </PriceGrid>
      )}
    </AppContext.Consumer>
  );
}
