import React from 'react';

export default function ({ coin, style }) {
  return (
    <div>
      <img
        alt={coin.CoinSymbol}
        src={`http://cryptocompare.com/${coin.ImageUrl}`}
        style={style || { height: '50px' }}
      />
    </div>
  );
}
