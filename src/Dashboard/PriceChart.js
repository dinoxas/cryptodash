import React from 'react';
// import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { Tile } from '../Shared/Tile';
import ReactHighcharts from 'react-highcharts';
import highchartsConfig from './HighchartsConfig';
import highchartsTheme from './HighchartsTheme';
import ChartSelect from './ChartSelect';

ReactHighcharts.Highcharts.setOptions(highchartsTheme);

export default function () {
  return (
    <AppContext.Consumer>
      {({ historical, changeChartSelect }) => (
        <Tile>
          <ChartSelect
            defaultValue={'months'}
            onChange={(e) => changeChartSelect(e.target.value)}
          >
            <option value='days'>Days</option>
            <option value='weeks'>Weeks</option>
            <option value='months'>Months</option>
          </ChartSelect>
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
