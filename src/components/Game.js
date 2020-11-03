import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from './Item';
import useInterval from '../../src/hooks/use-interval.hook';
import useKeyDown from '../../src/hooks/useKeyDown.hook';
import useDocumentTitle from '../../src/hooks/useDocumentTitle.hook';

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1, isFirstItem: true },
  { id: "megaCursor", name: "MegaCursor", cost: 50, value: 5 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    megaCursor: 0,
    grandma: 0,
    farm: 0,
  });

  useInterval(() => {
    const calculateCookiesPerTick = (items) => { 
      const arrayedItems = Object.entries(items);
      const total = arrayedItems.reduce((acc, cur) => {
        if (cur[0] === 'cursor') {
          acc += cur[1] * 1;
        }
        if (cur[0] === 'grandma') {
          acc += cur[1] * 10;
        }
        if (cur[0] === 'farm') {
          acc += cur[1] * 80;
        }  
        return acc;
      }, 0);
    return total;
    }
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  const handleClick = (id, cost) => {
    if (numCookies >= cost) {
      const itemIncrement = purchasedItems[id] + 1;
      setPurchasedItems({...purchasedItems, [id]: itemIncrement});
      setNumCookies(numCookies - cost);
      const theItem = items.find((item) => item.id === id);
      theItem.cost = Math.round(cost + ((10/100)*cost));
    } else {
      return window.alert(`You don't have enough cookies!`);
    }
  }

  const megaCursorValue = items.find((item) => item.id === 'megaCursor');
  let value = megaCursorValue.value;
  const handleCookies = () => {
    setNumCookies(numCookies + 1 + (purchasedItems.megaCursor * value));
  }

  useKeyDown('Space', handleCookies);
  useDocumentTitle(`${numCookies} cookies`, 'Cookie Clicker Workshop');

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{(purchasedItems.cursor * 1) + 
                  (purchasedItems.grandma * 10) +
                  (purchasedItems.farm * 80)}
          </strong> cookies per second
          <br></br>
          <strong>{1 + (purchasedItems.megaCursor * value)}</strong> cookies per click
        </Indicator>
        <Button onClick={handleCookies}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
          {items.map((item) => {
            return <Item 
              key={item.id} 
              item={item} 
              numCookies={numCookies} 
              purchasedItems={purchasedItems}
              handleClick={handleClick}
              />
          })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
