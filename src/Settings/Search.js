import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
`;

const SearchInput = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  border: 2px solid;
  height: 1.2rem;
  color: #1163c9;
  place-self: center left;
`;

export default function () {
  return (
    <SearchGrid>
      <h2>Search all coins</h2>
      <SearchInput />
    </SearchGrid>
  );
}
