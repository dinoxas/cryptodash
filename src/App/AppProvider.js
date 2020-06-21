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
      setFilteredCoins: this.setFilteredCoins,
      setCurrentFavourite: this.setCurrentFavourite
    };
  }

  componentDidMount() {
    this.fetchCoins();
    this.fetchPrices();
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

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    prices = prices.filter((price) => Object.keys(price).length);
    this.setState({ prices });
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favourites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favourites[i], 'USD');
        returnData.push(priceData);
      } catch (error) {
        console.warn('Fetch price error', error);
      }
    }
    return returnData;
  };

  saveSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) {
      return {
        page: 'settings',
        firstVisit: true
      };
    }

    let { favourites, currentFavourite } = cryptoDashData;

    return { favourites, currentFavourite };
  };

  isInFavourites = (key) => _.includes(this.state.favourites, key);

  confirmFavourites = () => {
    let currentFavourite = this.state.favourites[0];
    this.setState(
      {
        firstVisit: false,
        page: 'dashboard',
        currentFavourite
      },
      () => {
        this.fetchPrices();
      }
    );

    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        favourites: this.state.favourites,
        currentFavourite
      })
    );
  };

  setCurrentFavourite = (sym) => {
    this.setState({
      currentFavourite: sym
    });

    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('cryptoDash')),
        currentFavourite: sym
      })
    );
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
