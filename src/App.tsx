import React from 'react';
import './App.css';
import Game from "./components/game/Game";

const App = () => {
  return (
    <div className="App">
    <header className="App-header">
        Relax test
    </header>
    <Game numReels={5} startingAmount={100} startingBet={10}/>
    </div>
  );
}

export default App;
