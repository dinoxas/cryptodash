import React, { Component } from 'react';
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
      confirmFavourites: this.confirmFavourites
    };
  }

  componentDidMount() {
    this.fetchCoins();
  }

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
    return {};
  };

  confirmFavourites = () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    });

    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        test: 'Hello'
      })
    );
  };

  setPage = (page) => this.setState({ page });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
