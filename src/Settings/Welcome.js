import React from 'react';
import { AppContext } from '../App/AppProvider';

export default function ({ firstVisit }) {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? (
          <div>
            <h1>Welcome to CrypTrack!</h1>
            <p>
              Please confirm your faourite coins to begin. There are over 5,300
              coins to choose from!
            </p>
          </div>
        ) : null
      }
    </AppContext.Consumer>
  );
}
