import React from 'react';
import styled, { css } from 'styled-components';

const CoinImage = styled.img`
  display: block;
  height: 70px;
  margin: 0.5rem auto 0;

  ${(props) =>
    props.spotlight &&
    css`
      margin: auto;
      height: 10rem;
    `}
`;

export default function ({ coin, spotlight }) {
  return (
    <CoinImage
      alt={coin.CoinSymbol}
      src={`https://cryptocompare.com/${coin.ImageUrl}`}
      spotlight={spotlight}
    />
  );
}
