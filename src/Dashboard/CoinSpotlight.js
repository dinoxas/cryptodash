import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { Tile } from '../Shared/Tile';
import CoinImage from '../Shared/CoinImage';

const SpotlightName = styled.h2`
  text-align: center;
`;

export default function () {
  return (
    <AppContext.Consumer>
      {({ currentFavourite, coinList }) => (
        <Tile>
          <SpotlightName>{coinList[currentFavourite].CoinName}</SpotlightName>
          <CoinImage coin={coinList[currentFavourite]} spotlight />
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
