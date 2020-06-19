import React from 'react';
import { AppContext } from '../App/AppProvider';

export default function ({ firstVisit }) {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? (
          <div>
            Welcome to Crypto Dashboard! Please select your faourite coints to
            begin.
          </div>
        ) : null
      }
    </AppContext.Consumer>
  );
}
