import React from 'react';
import _ from 'lodash';
import fuzzy from 'fuzzy';
import { AppContext } from '../App/AppProvider';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
`;

const SearchLabel = styled.label`
  align-self: center;
`;

const SearchInput = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  border: 1px solid #010e2c;
  height: 2.2rem;
  color: #010e2c;
  padding: 0 0.5rem;
  align-self: center;
  justify-self: left;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
  }
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
          <SearchLabel htmlFor='searchInput'>Search</SearchLabel>
          <SearchInput
            onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}
            placeholder='Enter coin name...'
            id='searchInput'
          />
        </SearchGrid>
      )}
    </AppContext.Consumer>
  );
}
