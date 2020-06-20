import React from 'react';
import _ from 'lodash';
import fuzzy from 'fuzzy';
import { AppContext } from '../App/AppProvider';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
`;

const SearchInput = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  border: 2px solid;
  height: 1.2rem;
  color: #1163c9;
  place-self: center left;
`;

// debouce function to prevent firing too many events
const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
  // get all the coin symbols
  let coinSymbols = Object.keys(coinList);
  // get all the coin names, map symbol to name
  let coinNames = coinSymbols.map((sym) => coinList[sym].CoinName);
  // combine both
  let allStringsToSearch = coinSymbols.concat(coinNames);

  let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map((result) => result.string);

  //
  let filteredCoins = _.pickBy(coinList, (result, symKey) => {
    let coinName = result.CoinName;
    return (
      _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
    );
  });
  setFilterCoins(filteredCoins);
}, 500);

function filterCoins(event, setFilteredCoins, coinList) {
  let inputValue = event.target.value;
  if (!inputValue) {
    // show all coins if theres no input
    setFilteredCoins(null);
    return;
  }
  handleFilter(inputValue, coinList, setFilteredCoins);
}

export default function () {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList }) => (
        <SearchGrid>
          <h2>Search all coins</h2>
          <SearchInput
            onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}
            placeholder='Enter coin name...'
          />
        </SearchGrid>
      )}
    </AppContext.Consumer>
  );
}
