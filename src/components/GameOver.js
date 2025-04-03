import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { FiDownload } from 'react-icons/fi';
import { FiFrown, FiSmile, FiAward, FiStar } from 'react-icons/fi';
import lowScoreImg from '../assets/low-score.png';
import mediumScoreImg from '../assets/medium-score.png';
import highScoreImg from '../assets/high-score.png';
import topScoreImg from '../assets/top-score.png';

const GameOver = ({ score, onPlayAgain }) => {
  const cardRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  
  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine message, image, and theme based on score
  let message = '';
  let image = '';
  let theme = {};
  
  if (score < 10) {
    message = <span>J97: " <span style={{color: '#ff6b6b', fontWeight: 'bold'}}>{score}</span> điểm, quá cùi bắp "</span>;
    image = lowScoreImg;
    theme = {
      color: '#ff6b6b',
      icon: <FiFrown size={20} />
    };
  } else if (score >= 10 && score < 20) {
    message = <span>J97: " Gì có <span style={{color: '#4a8cff', fontWeight: 'bold'}}>{score}</span> điểm z bà thơ? bà giỡn với tui hả? "</span>;
    image = mediumScoreImg;
    theme = {
      color: '#4a8cff',
      icon: <FiSmile size={20} />
    };
  } else if (score >= 20 && score < 25) {
    message = <span>J97: " Giỏii quá, được <span style={{color: '#00d084', fontWeight: 'bold'}}>{score}</span> điểm lun, thửn cho bà nèe "</span>;
    image = highScoreImg;
    theme = {
      color: '#00d084',
      icon: <FiAward size={20} />
    };
  } else {
    message = <span>J97: " <span style={{color: '#ff9d00', fontWeight: 'bold'}}>{score}</span> điểm, đỉnh nóc kịch trần. Bà được thưởng 1 đêm với tuii ó "</span>;
    image = topScoreImg;
    theme = {
      color: '#ff9d00',
      icon: <FiStar size={20} />
    };
  }

  const downloadAsImage = () => {
    if (cardRef.current) {
      setIsCapturing(true);
      
      setTimeout(() => {
        html2canvas(cardRef.current).then(canvas => {
          const link = document.createElement('a');
          link.download = `hunter-score-${score}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          
          setIsCapturing(false);
        });
      }, 100);
    }
  };

  return (
    <div className="game-over-dialog">
      <div 
        ref={cardRef}
        className="game-over-content"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: isCapturing ? '40px' : '30px',
          border: `4px solid ${theme.color}`,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#fff',
          borderRadius: '15px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
        }}
      >
        {/* Score badge */}
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          background: theme.color,
          color: 'white',
          padding: '8px 16px',
          fontSize: 'clamp(18px, 5vw, 24px)',
          fontWeight: 'bold',
          borderRadius: '0 0 0 15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {score} {theme.icon}
        </div>
        
        <h2 style={{ 
          marginTop: '10px',
          fontSize: 'clamp(22px, 6vw, 28px)', 
          color: theme.color,
          borderBottom: `2px solid ${theme.color}`,
          paddingBottom: '10px'
        }}>
          Hết giờ gòii!
        </h2>
        
        <div style={{ margin: '20px 0' }}>
          <h3 style={{ 
            fontSize: 'clamp(16px, 4.5vw, 20px)', 
            color: '#333',
            margin: '15px 0'
          }}>
            {message}
          </h3>
          
          <div style={{ 
            margin: '25px auto',
            maxWidth: '280px',
            position: 'relative'
          }}>
            <img 
              src={image} 
              alt="Score feedback" 
              style={{ 
                width: '100%', 
                height: 'auto',
                display: 'block',
                borderRadius: '10px',
                border: `3px solid ${theme.color}`,
                boxShadow: '0 5px 15px rgba(0,0,0,0.15)'
              }} 
            />
          </div>
        </div>
        
        {!isCapturing && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '15px',
            marginTop: '20px',
            borderTop: '1px solid #eee',
            paddingTop: '20px',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <button 
              onClick={onPlayAgain}
              style={{
                backgroundColor: theme.color,
                color: 'white',
                border: 'none',
                padding: '12px 0',
                width: '100%',
                fontSize: 'clamp(14px, 4vw, 16px)',
                cursor: 'pointer',
                borderRadius: '5px',
                fontWeight: 'bold',
                boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '120px'
              }}
            >
              Chơi lại
            </button>
            
            <button
              onClick={downloadAsImage}
              style={{
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                padding: '12px 0',
                width: '100%',
                fontSize: 'clamp(14px, 4vw, 16px)',
                cursor: 'pointer',
                borderRadius: '5px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
                minWidth: '120px'
              }}
            >
              <FiDownload /> Tải hình ảnh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameOver;