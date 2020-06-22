import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import PriceTile from './PriceTile';

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  margin-top: 2rem;
  max-width: 1200px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export default function () {
  return (
    <AppContext.Consumer>
      {({ prices }) => (
        <PriceGrid>
          {prices.map((price, index) => (
            <PriceTile price={price} index={index} key={`priceTile-${index}`} />
          ))}
        </PriceGrid>
      )}
    </AppContext.Consumer>
  );
}
