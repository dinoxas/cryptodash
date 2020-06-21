import React from 'react';
// import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { Tile } from '../Shared/Tile';
import ReactHighcharts from 'react-highcharts';
import highchartsConfig from './HighchartsConfig';

export default function () {
  return (
    <AppContext.Consumer>
      {() => (
        <Tile>
          <ReactHighcharts config={highchartsConfig()} />
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
