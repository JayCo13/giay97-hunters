import React, { useState } from 'react';
import GameOver from './GameOver';

const GameOverTest = () => {
  const [testScore, setTestScore] = useState(10);
  const [showCard, setShowCard] = useState(true);

  const scoreRanges = [
    { label: "Low Score (<10)", value: 5 },
    { label: "Medium Score (10-19)", value: 15 },
    { label: "High Score (20-24)", value: 22 },
    { label: "Top Score (25+)", value: 30 }
  ];

  const handlePlayAgain = () => {
    setShowCard(false);
    setTimeout(() => setShowCard(true), 500);
  };

  const handleCustomScoreChange = (e) => {
    setTestScore(parseInt(e.target.value) || 0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Game Over Card Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          {scoreRanges.map(range => (
            <button 
              key={range.value}
              onClick={() => setTestScore(range.value)}
              style={{
                padding: '8px 16px',
                backgroundColor: testScore === range.value ? '#4CAF50' : '#f0f0f0',
                color: testScore === range.value ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label>Custom score:</label>
          <input 
            type="number" 
            value={testScore}
            onChange={handleCustomScoreChange}
            style={{ padding: '8px', width: '80px' }}
          />
        </div>
      </div>
      
      {showCard && <GameOver score={testScore} onPlayAgain={handlePlayAgain} />}
    </div>
  );
};

export default GameOverTest;