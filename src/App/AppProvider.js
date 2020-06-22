import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

const cc = require('cryptocompare');
cc.setApiKey(
  '82ff5a19c02023810bd909e0941fc8244ac634caa56997295b9af424a03685a4'
);

export const AppContext = React.createContext();

const MAX_FAVS = 10;
const TIME_UNITS = 10;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      favourites: ['BTC', 'ETH', 'SC'],
      timeInterval: 'months',
      ...this.saveSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      confirmFavourites: this.confirmFavourites,
      isInFavourites: this.isInFavourites,
      setFilteredCoins: this.setFilteredCoins,
      setCurrentFavourite: this.setCurrentFavourite,
      changeChartSelect: this.changeChartSelect
    };
  }

  componentDidMount() {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
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

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let results = await this.historical();
    // hicharts series
    let historical = [
      {
        name: this.state.currentFavourite,
        data: results.map((ticker, index) => [
          moment()
            .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
            .valueOf(),
          ticker.USD
        ])
      }
    ];
    this.setState({ historical });
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

  historical = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavourite,
          ['USD'],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        )
      );
    }
    return Promise.all(promises);
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
        currentFavourite,
        prices: null,
        historical: null
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
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
    this.setState(
      {
        currentFavourite: sym,
        historical: null
      },
      this.fetchHistorical
    );

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

  changeChartSelect = (value) => {
    this.setState(
      {
        historical: null,
        timeInterval: value
      },
      this.fetchHistorical
    );
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
