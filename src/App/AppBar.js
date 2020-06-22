import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from './AppProvider';

const Bar = styled.div`
  position: fixed;
  background: #010e2c;
  width: 100%;
  height: 50px;
  border: 1px solid #010717;
  z-index: 2;
`;

const BarContent = styled.div`
  color: white;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 80px 80px;
  height: 100%;
`;

const Logo = styled.div`
  font-size: 1.35rem;
  align-self: center;
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  align-self: center;
  text-align: right;
  ${(props) =>
    props.active &&
    css`
      color: #03ff03;
    `}

  ${(props) =>
    props.hidden &&
    css`
      display: none;
    `}
`;

function toProperCase(lower) {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
}

function ControlButton({ name }) {
  return (
    <AppContext.Consumer>
      {({ page, setPage, firstVisit }) => (
        <ControlButtonElem
          active={page === name}
          onClick={() => setPage(name)}
          hidden={firstVisit && name === 'dashboard'}
        >
          {toProperCase(name)}
        </ControlButtonElem>
      )}
    </AppContext.Consumer>
  );
}

export default function AppBar() {
  return (
    <Bar>
      <BarContent>
        <Logo>CrypTrack</Logo>
        <ControlButton active name='dashboard' />
        <ControlButton name='settings' />
      </BarContent>
    </Bar>
  );
}
