import React from 'react';
// import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { Tile } from '../Shared/Tile';
import ReactHighcharts from 'react-highcharts';
import highchartsConfig from './HighchartsConfig';
import highchartsTheme from './HighchartsTheme';

ReactHighcharts.Highcharts.setOptions(highchartsTheme);

export default function () {
  return (
    <AppContext.Consumer>
      {({ historical }) => (
        <Tile>
          {historical ? (
            <ReactHighcharts config={highchartsConfig(historical)} />
          ) : (
            <div>Loading charts...</div>
          )}
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
