import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
// import { SelectableTile } from '../Shared/Tile';
import CoinTile from '../Settings/CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 1rem;
  margin-top: 3rem;
`;

function getLowerSectionCoins(coinList, filteredCoins) {
  return (
    (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinList).slice(0, 50)
  );
}

function getCoinsToDisplay(coinList, topSection, favourites, filterCoins) {
  return topSection ? favourites : getLowerSectionCoins(coinList, filterCoins);
}

export default function ({ topSection }) {
  return (
    <AppContext.Consumer>
      {({ coinList, favourites, filteredCoins }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(
            coinList,
            topSection,
            favourites,
            filteredCoins
          ).map((coinKey, index) => (
            <CoinTile key={index} coinKey={coinKey} topSection={topSection} />
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
}
