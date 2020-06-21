import React from 'react';
import styled, { css } from 'styled-components';

const CoinImage = styled.img`
  height: 50px;
  ${(props) =>
    props.spotlight &&
    css`
      margin: auto;
      display: block;
      height: 10rem;
    `}
`;

export default function ({ coin, spotlight }) {
  return (
    <CoinImage
      alt={coin.CoinSymbol}
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
      spotlight={spotlight}
    />
  );
}
