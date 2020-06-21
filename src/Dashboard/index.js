import React from 'react';
// import styled from 'styled-components';
// import { AppContext } from '../App/AppProvider';
import Page from '../Shared/Page';
import PriceGrid from './PriceGrid';

export default function () {
  return (
    <Page name='dashboard'>
      <PriceGrid />
    </Page>
  );
}
