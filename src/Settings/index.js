import React from 'react';
import Welcome from './Welcome';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';
import CoinGrid from '../Settings/CoinGrid';

export default function () {
  return (
    <Page name='settings'>
      <Welcome />
      <ConfirmButton />
      <CoinGrid />
    </Page>
  );
}
