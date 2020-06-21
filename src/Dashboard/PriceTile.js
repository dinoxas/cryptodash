import React from 'react';
import styled, { css } from 'styled-components';
import { SelectableTile } from '../Shared/Tile';
import { fontSize3, fontSizeBig, greenBoxShadow } from '../Shared/Styles';
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid';
import { AppContext } from '../App/AppProvider';

const numberFormat = (number) => {
  return (number + '').slice(0, 7);
};

const JustifyLeft = styled.div`
  justify-self: left;
`;

const JustifyRight = styled.div`
  justify-self: right;
`;

const TickerPrice = styled.div`
  ${fontSizeBig}
`;

const ChangePct = styled.div`
  color: green;
  ${(props) =>
    props.red &&
    css`
      color: red;
    `}
`;

const PriceTileStyled = styled(SelectableTile)`
  ${(props) =>
    props.compact &&
    css`
      ${fontSize3};
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0.5rem;
      justify-items: right;
    `}

  ${(props) =>
    props.currentFavourite &&
    css`
      ${greenBoxShadow};
      pointer-events: none;
    `}
`;

function ChangePercent({ data }) {
  return (
    <JustifyRight>
      <ChangePct red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}%
      </ChangePct>
    </JustifyRight>
  );
}

function PriceTile({ sym, data, currentFavourite, setCurrentFavourite }) {
  return (
    <PriceTileStyled
      currentFavourite={currentFavourite}
      onClick={setCurrentFavourite}
    >
      <CoinHeaderGridStyled>
        <div>{sym}</div>
        <ChangePercent data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
}

function PriceTileCompact({
  sym,
  data,
  currentFavourite,
  setCurrentFavourite
}) {
  return (
    <PriceTileStyled
      compact
      currentFavourite={currentFavourite}
      onClick={setCurrentFavourite}
    >
      <JustifyLeft>{sym}</JustifyLeft>
      <ChangePercent data={data} />
      <div>${numberFormat(data.PRICE)}</div>
    </PriceTileStyled>
  );
}

export default function ({ price, index }) {
  // extracts symbol
  let sym = Object.keys(price)[0];
  // access nested object
  let data = price[sym]['USD'];

  let TileClass = index < 5 ? PriceTile : PriceTileCompact;

  // console.log(data);
  return (
    <AppContext.Consumer>
      {({ currentFavourite, setCurrentFavourite }) => (
        <TileClass
          sym={sym}
          data={data}
          currentFavourite={currentFavourite === sym}
          setCurrentFavourite={() => setCurrentFavourite(sym)}
        />
      )}
    </AppContext.Consumer>
  );
}
