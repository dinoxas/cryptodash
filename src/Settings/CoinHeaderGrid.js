import React from 'react';
import styled from 'styled-components';
import { DeletableTile } from '../Shared/Tile';

export const CoinHeaderGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  position: relative;
`;

export const CoinSymbol = styled.div`
  justify-self: right;
`;

export const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${DeletableTile}:hover & {
    display: block;
    color: white;
    background: #e74c3c;
    border-radius: 50%;
    box-sizing: border-box;
    text-align: center;
    position: absolute;
    padding: 0.2rem 0.4rem;
    right: 0;
    top: 0;
  }
`;

export default function ({ name, symbol, topSection }) {
  return (
    <CoinHeaderGridStyled>
      <div>{name}</div>
      {topSection ? (
        <DeleteIcon>X</DeleteIcon>
      ) : (
        <CoinSymbol>{symbol}</CoinSymbol>
      )}
    </CoinHeaderGridStyled>
  );
}
