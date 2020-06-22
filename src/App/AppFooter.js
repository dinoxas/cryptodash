import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  background: #010e2c;
  color: white;
  height: 50px;
  padding: 1.5rem;
  margin-top: 3.5rem;
  text-align: center;
`;
export default function () {
  return (
    <Footer>
      <p>
        Coded with{' '}
        <span role='img' aria-label='heart'>
          ❤️
        </span>{' '}
        by dinoxas
      </p>
    </Footer>
  );
}
