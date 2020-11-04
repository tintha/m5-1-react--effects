import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

function App(props) {
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    megaCursor: 0,
    grandma: 0,
    farm: 0,
  });

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game 
            numCookies={numCookies} 
            setNumCookies={setNumCookies} 
            purchasedItems={purchasedItems}
            setPurchasedItems={setPurchasedItems} 
            />
        </Route>
      </Router>
    </>
  );
}

export default App;
