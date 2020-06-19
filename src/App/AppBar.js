import React from 'react';
import styled, { css } from 'styled-components';

const Bar = styled.div`
  display: grid;
  grid-template-columns: 200px auto 100px 100px;
  margin-bottom: 3rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
`;

const ControlBUttonElem = styled.div`
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      text-shadow: 0px 0px 2.5rem #03ff03;
    `}
`;

function toProperCase(lower) {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
}

function ControlButton({ name, active }) {
  return (
    <ControlBUttonElem active={active}>{toProperCase(name)}</ControlBUttonElem>
  );
}

export default function AppBar() {
  return (
    <Bar>
      <Logo>CryptoDash</Logo>
      <div></div>
      <ControlButton active name='dashboard' />
      <ControlButton name='settings' />
    </Bar>
  );
}
