import React from 'react';
import Welcome from './Welcome';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';
import CoinGrid from '../Settings/CoinGrid';
import Search from './Search';

export default function () {
  return (
    <Page name='settings'>
      <Welcome />
      <CoinGrid topSection />
      <ConfirmButton />
      <Search />
      <CoinGrid />
    </Page>
  );
}
