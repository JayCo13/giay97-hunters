import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import GameContainer from './components/GameContainer';
import StartDialog from './components/StartDialog';
import { initAudio, playSound, stopSound } from './utils/audio';
import { useGameState } from './hooks/useGameState';
import { useCloudEffect } from './hooks/useCloudEffect';

function App() {
  const {
    position, setPosition,
    birds, setBirds,
    score, setScore,
    isDragging, setIsDragging,
    ammo, setAmmo,
    isReloading, setIsReloading,
    gameStarted, setGameStarted,
    aimDuration, setAimDuration,
    showInstructions, setShowInstructions,
    timeRemaining, setTimeRemaining,
    showGameOver, setShowGameOver,
    lastShotTime, setLastShotTime,
    // Remove or comment out unused variables
    // lastBirdSoundTime, setLastBirdSoundTime
  } = useGameState();
  
  // Add state to track if we're on a mobile device
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const gameContainerRef = useRef(null);
  const clouds = useCloudEffect(true);
  
  // Add a resize listener to detect mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Game timer - add missing dependencies
  useEffect(() => {
    if (!gameStarted || showGameOver) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowGameOver(true);
          // Stop the game by clearing birds and preventing further interaction
          setBirds([]);
          
          // Stop all audio when game ends
          stopSound('shot');
          stopSound('birdHit');
          stopSound('birdFly');
          stopSound('reload');
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, showGameOver, setBirds, setShowGameOver, setTimeRemaining]);
  
  // Hide instructions after 10 seconds - add missing dependency
  useEffect(() => {
    if (gameStarted && showInstructions) {
      const timer = setTimeout(() => {
        setShowInstructions(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [gameStarted, showInstructions, setShowInstructions]);
  
  // Initialize audio on game start
  useEffect(() => {
    if (gameStarted) {
      initAudio();
    }
  }, [gameStarted]);
  
  // Reload function
  const reload = () => {
    if (!isReloading) {
      setIsReloading(true);
      playSound('reload');
      
      setTimeout(() => {
        setAmmo(5);
        setIsReloading(false);
      }, 1000);
    }
  };
  
  // Start game function
  const handleStartGame = () => {
    setGameStarted(true);
    setScore(0);
    setAmmo(5);
    setBirds([]);
    setShowInstructions(true);
    setTimeRemaining(40);
    setShowGameOver(false);
  };
  
  // Generate some preview birds for the background
  const [previewBirds, setPreviewBirds] = useState([]);
  
  useEffect(() => {
    if (!gameStarted) {
      // Create some static birds for the preview
      const staticBirds = Array(3).fill().map((_, i) => ({
        id: `preview-${i}`,
        x: 20 + (i * 30),
        y: 30 + (i * 15),
        direction: Math.random() > 0.5 ? 'right' : 'left',
        speed: 0, // Static birds
        size: 60 + Math.random() * 20,
        type: Math.floor(Math.random() * 3)
      }));
      setPreviewBirds(staticBirds);
    } else {
      setPreviewBirds([]);
    }
  }, [gameStarted]);

  // Modify bird positions to avoid the control area on mobile
  useEffect(() => {
    if (isMobile && gameStarted) {
      setBirds(prevBirds => {
        return prevBirds.map(bird => {
          // If bird is in the bottom control area (bottom 20% of screen), move it up
          if (bird.y > 80) {
            return {
              ...bird,
              y: Math.min(bird.y, 75) // Keep birds in the top 75% of the screen
            };
          }
          return bird;
        });
      });
    }
  }, [isMobile, gameStarted, setBirds]);

  return (
    <div 
      className="game-container"
      ref={gameContainerRef}
      onClick={() => initAudio()}
    >
      {/* Always render the GameContainer, but with different props based on gameStarted */}
      <GameContainer
        gameContainerRef={gameContainerRef}
        clouds={clouds}
        birds={gameStarted ? birds : previewBirds}
        setBirds={gameStarted ? setBirds : () => {}}
        score={score}
        setScore={setScore}
        timeRemaining={timeRemaining}
        ammo={ammo}
        setAmmo={setAmmo}
        isReloading={isReloading}
        setIsReloading={setIsReloading}
        reload={reload}
        showGameOver={showGameOver}
        handleStartGame={handleStartGame}
        position={position}
        setPosition={setPosition}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        aimDuration={aimDuration}
        setAimDuration={setAimDuration}
        lastShotTime={lastShotTime}
        setLastShotTime={setLastShotTime}
        isPreview={!gameStarted}
        isMobile={isMobile} // Pass the mobile state to GameContainer
      />
      
      {!gameStarted && <StartDialog onStartGame={handleStartGame} />}
    </div>
  );
}

export default App;

