import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { SelectableTile } from '../Shared/Tile';
import CoinTile from '../Settings/CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  margin-top: 3rem;
`;

function getCoinsToDisplay(coinList, topSection) {
  //get first 100 coins
  return Object.keys(coinList).slice(0, topSection ? 10 : 50);
}

export default function ({ topSection }) {
  return (
    <AppContext.Consumer>
      {({ coinList }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection).map((coinKey) => (
            <CoinTile key={coinKey} coinKey={coinKey} topSection={topSection} />
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
}
