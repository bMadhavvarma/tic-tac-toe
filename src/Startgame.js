import React, { useState, useEffect, useCallback } from 'react';
import './Startgame.css';
import ResultPopup from './ResultPopup'; // Import ResultPopup component

const Startgame = ({ selectedPlayer, onQuit }) => {
  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem('board');
    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null);
  });
  const [isXTurn, setIsXTurn] = useState(() => {
    const savedIsXTurn = localStorage.getItem('isXTurn');
    return savedIsXTurn ? JSON.parse(savedIsXTurn) : selectedPlayer === 'X';
  });
  const [winner, setWinner] = useState(null);
  const [ties, setTies] = useState(() => parseInt(localStorage.getItem('ties')) || 0);
  const [xWins, setXWins] = useState(() => parseInt(localStorage.getItem('xWins')) || 0);
  const [oWins, setOWins] = useState(() => parseInt(localStorage.getItem('oWins')) || 0);
  const [showResult, setShowResult] = useState(false);
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board));
    localStorage.setItem('isXTurn', JSON.stringify(isXTurn));
    localStorage.setItem('page', 'startgame');
  }, [board, isXTurn]);

  // Function to check for winner
  const checkWinner = useCallback((newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        return;
      }
    }

    if (newBoard.every(cell => cell !== null)) {
      setTies(prevTies => {
        const newTies = prevTies + 1;
        localStorage.setItem('ties', newTies);
        return newTies;
      });
      setWinner('Tie');
    }
  }, []);

  // Use effect to handle game state changes
  useEffect(() => {
    if (winner) {
      if (winner === 'X') {
        setXWins(prevXWins => {
          const newXWins = prevXWins + 1;
          localStorage.setItem('xWins', newXWins);
          return newXWins;
        });
      } else if (winner === 'O') {
        setOWins(prevOWins => {
          const newOWins = prevOWins + 1;
          localStorage.setItem('oWins', newOWins);
          return newOWins;
        });
      }
      setResultText(winner === 'Tie' ? 'It\'s a Tie!' : `${winner} Wins!`);
      setShowResult(true);
      return;
    }

    if (!isXTurn && !winner) {
      const emptyIndices = board.map((val, index) => val === null ? index : null).filter(val => val !== null);
      if (emptyIndices.length > 0) {
        setTimeout(() => {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = board.slice();
          newBoard[randomIndex] = selectedPlayer === 'X' ? 'O' : 'X';
          setBoard(newBoard);
          setIsXTurn(true);
          checkWinner(newBoard);
        }, 750);
      }
    }
  }, [isXTurn, board, winner, selectedPlayer, checkWinner]);

  // Handle click on a cell
  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = selectedPlayer;
    setBoard(newBoard);
    setIsXTurn(false);
    checkWinner(newBoard);
  };

  // Handle reset
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(selectedPlayer === 'X');
    setWinner(null);
    setShowResult(false);
  };

  // Handle play again
  const handlePlayAgain = () => {
    handleReset();
  };

  // Handle quit
  const handleQuit = () => {
    localStorage.removeItem('xWins');
    localStorage.removeItem('oWins');
    localStorage.removeItem('ties');
    localStorage.removeItem('board');
    localStorage.removeItem('isXTurn');
    localStorage.removeItem('page');
    handleReset();
    onQuit();
  };

  // Determine the current player's turn message
  const currentPlayerTurn = isXTurn ? 'X' : 'O';
  const humanPlayerTurn = selectedPlayer === 'X' ? currentPlayerTurn : (currentPlayerTurn === 'X' ? 'O' : 'X');

  return (
    <div className='game'>
      <div className='game-container'>
        <div className='topheading'>
          <h1>X <span>O</span></h1>
          <p>{`${humanPlayerTurn}'s TURN`}</p>
          <button onClick={handleReset}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="bi bi-repeat" viewBox="0 0 16 16">
              <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
            </svg>
          </button>
        </div>
        <div className={`boxes ${showResult ? 'disabled' : ''}`}>
          {board.map((cell, index) => (
            <button
              key={index}
              className={`box ${cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''}`}
              onClick={() => handleClick(index)}
            >
              {cell}
            </button>
          ))}
        </div>
        <div className='bottom'>
          <p className='p1'>{selectedPlayer}(YOU)<br />{selectedPlayer === 'X' ? xWins : oWins}</p>
          <p className='p2'>TIES<br />{ties}</p>
          <p className='p3'>{selectedPlayer === 'X' ? 'O(CPU)' : 'X(CPU)'}<br />{selectedPlayer === 'X' ? oWins : xWins}</p>
        </div>
      </div>
      {showResult && (
        <ResultPopup
          result={resultText}
          onPlayAgain={handlePlayAgain}
          onQuit={handleQuit}
        />
      )}
   
    </div>
  );
};

export default Startgame;
