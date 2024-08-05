import './App.css';
import Homepage from './Homepage';
import Gamebox from './Gamebox';
import Startgame from './Startgame';
import React, { useState } from 'react';

function App() {
  const [showStartGame, setShowStartGame] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleStartGame = () => {
    if (selectedPlayer) {
      setShowStartGame(true);
    } else {
      alert("Please select a player first!");
    }
  };

  const handleQuit = () => {
    setShowStartGame(false);
    setSelectedPlayer(null);
  };

  return (
    <div className="App">
      {showStartGame ? (
        <Startgame selectedPlayer={selectedPlayer} onQuit={handleQuit} />
      ) : (
        <Gamebox
          onPlayerSelect={setSelectedPlayer}
          onStartGame={handleStartGame}
          selectedPlayer={selectedPlayer}
        />
      )}
      <Homepage />
    </div>
  );
}

export default App;
