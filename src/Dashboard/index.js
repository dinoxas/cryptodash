import React from 'react';
import styled from 'styled-components';
// import { AppContext } from '../App/AppProvider';
import Page from '../Shared/Page';
import PriceGrid from './PriceGrid';
import CoinSpotlight from './CoinSpotlight';
import PriceChart from './PriceChart';

const CharGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 1rem;
  margin-top: 2rem;
  @media (max-width: 900px) {
    display: block;
  }
`;

export default function () {
  return (
    <Page name='dashboard'>
      <PriceGrid />
      <CharGrid>
        <CoinSpotlight />
        <PriceChart />
      </CharGrid>
    </Page>
  );
}
