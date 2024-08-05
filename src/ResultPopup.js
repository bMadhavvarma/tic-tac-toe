
import React, { useState, useEffect } from 'react';
import './Startgame.css';

const ResultPopup = ({ result, onPlayAgain, onQuit }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 750); 

      return () => clearTimeout(timer);
    }
  }, [result]);

  if (!showPopup) {
    return null;
  }

  return (
    <div className='result-popup'>
      <div className='result-content'>
        <h2>{result}</h2>
        <button className='but1' onClick={onPlayAgain}>Play Again</button>
        <button className='but2' onClick={onQuit}>Quit</button>
      </div>
    </div>
  );
};

export default ResultPopup;
