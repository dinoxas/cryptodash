import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { fontSize1, greenBoxShadow, color3 } from '../Shared/Styles';

const ConfirmButtonStyled = styled.button`
  background: transparent;
  font-family: 'Do Hyeon', sans-serif;
  border: 2px solid ${color3};
  color: ${color3};
  ${fontSize1}
  cursor: pointer;
  margin: 1rem;
  padding: 0.5rem 1rem;

  &:hover {
    ${greenBoxShadow}
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
