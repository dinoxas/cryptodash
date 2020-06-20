import React, { Component } from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');
cc.setApiKey(
  '82ff5a19c02023810bd909e0941fc8244ac634caa56997295b9af424a03685a4'
);

export const AppContext = React.createContext();

const MAX_FAVS = 10;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      favourites: ['BTC', 'ETH', 'XMR'],
      ...this.saveSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      confirmFavourites: this.confirmFavourites,
      isInFavourites: this.isInFavourites,
      setFilteredCoins: this.setFilteredCoins
    };
  }

  componentDidMount() {
    this.fetchCoins();
  }

  addCoin = (key) => {
    let favourites = [...this.state.favourites];
    if (favourites.length < MAX_FAVS) {
      favourites.push(key);
      this.setState({ favourites });
    }
  };

  removeCoin = (key) => {
    let favourites = [...this.state.favourites];
    this.setState({
      favourites: _.pull(favourites, key)
    });
  };

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  };

  saveSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) {
      return {
        page: 'settings',
        firstVisit: true
      };
    }

    let { favourites } = cryptoDashData;

    return { favourites };
  };

  isInFavourites = (key) => _.includes(this.state.favourites, key);

  confirmFavourites = () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    });

    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        favourites: this.state.favourites
      })
    );

    console.log(localStorage.getItem('cryptoDash'));
  };

  setPage = (page) => this.setState({ page });

  setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
