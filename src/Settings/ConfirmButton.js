import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { fontSize1 } from '../Shared/Styles';

const ConfirmButtonStyled = styled.button`
  background: transparent;
  font-family: 'Do Hyeon', sans-serif;
  border: 2px solid #010e2c;
  color: #010e2c;
  ${fontSize1}
  cursor: pointer;
  margin: 2rem auto;
  padding: 0.5rem 1.5rem;
  transition: all 0.25s ease-in;

  &:focus,
  &:hover {
    background: #010e2c;
    color: white;
  }
`;

export const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`;

export default function () {
  return (
    <AppContext.Consumer>
      {({ confirmFavourites }) => (
        <CenterDiv>
          <ConfirmButtonStyled onClick={confirmFavourites}>
            Confirm Favourites
          </ConfirmButtonStyled>
        </CenterDiv>
      )}
    </AppContext.Consumer>
  );
}
