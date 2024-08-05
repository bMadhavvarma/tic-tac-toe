import React from 'react';
import './Gamebox.css';

function Gamebox({ onPlayerSelect, onStartGame, selectedPlayer }) {
  const human = () => {
    alert("Coming soon");
  };

  const invite = () => {
    const deployLink = "https://bmadhavvarma.github.io/tic-tac-toe/";
    navigator.clipboard.writeText(deployLink).then(() => {
      alert("The link has been copied to your clipboard: " + deployLink);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className='game'>
      <div className='game-container'>
        <p id="X">X <span id='O'>O</span></p>
        <div className='pickPlayer'>
          PICK PLAYER<br />
          <div>
            <button
              className={`button1 ${selectedPlayer === 'X' ? 'selected' : ''}`}
              onClick={() => onPlayerSelect('X')}
            >
              X
            </button>
            <button
              className={`button2 ${selectedPlayer === 'O' ? 'selected' : ''}`}
              onClick={() => onPlayerSelect('O')}
            >
              O
            </button>
          </div>
        </div>
        <button className='cpu' onClick={onStartGame}>
          NEW GAME (VS CPU)
        </button>
        <button className='human' onClick={human}>
          NEW GAME (VS HUMAN) <span>Coming soon</span>
        </button>
        <button className='invite' onClick={invite}>
          Invite your friend
        </button>
      </div>
    </div>
  );
}

export default Gamebox;
