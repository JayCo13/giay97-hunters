import React from 'react';
import { FiRefreshCw } from 'react-icons/fi'; // Import refresh icon

const GameHUD = ({ score, timeRemaining, ammo, isReloading, reload, showGameOver }) => {
  return (
    <>
      <div className="score">Điểm: {score}</div>
      <div className="timer">
        <span role="img" aria-label="clock" style={{ marginRight: '5px' }}>⏱️: </span>
        {timeRemaining}s
      </div>
      
      {/* Ammo display */}
      <div 
        className="ammo-display"
        style={{
          position: 'fixed',
          bottom: '5%',
          left: '5%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#fff',
          padding: '10px 15px',
          borderRadius: '10px',
          zIndex: 100
        }}
      >
        <div className="bullets">
          {Array(5).fill().map((_, i) => (
            <div 
              key={i} 
              className={`bullet ${isReloading ? 'reloading' : ''}`}
              style={{
                fontSize: '24px',
                lineHeight: '1.2',
                transition: 'all 0.2s ease'
              }}
            >
              {i < ammo ? '🔴' : '⚪'}
            </div>
          ))}
        </div>
      </div>
      
      {/* Reload button */}
      {!showGameOver && ammo < 5 && !isReloading && (
        <button 
          className="reload-button" 
          onClick={(e) => {
            e.stopPropagation();
            reload();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
        >
          <FiRefreshCw size={24} strokeWidth={4}/>
        </button>
      )}
    </>
  );
};

export default GameHUD;