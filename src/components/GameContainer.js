import React, { useEffect } from 'react';
import Cloud from './Cloud';
import Bird from './Bird';
import Gun from './Gun';
import GameHUD from './GameHUD';
import GameOver from './GameOver';
import { playSound, stopSound } from '../utils/audio';
import { useBirdGenerator } from '../hooks/useBirdGenerator';
import { useBirdMovement } from '../hooks/useBirdMovement';
import { useAimingControls } from '../hooks/useAimingControls';

const GameContainer = ({
  gameContainerRef,
  clouds,
  birds,
  setBirds,
  score,
  setScore,
  timeRemaining,
  ammo,
  setAmmo,
  isReloading,
  setIsReloading,
  reload,
  showGameOver,
  handleStartGame,
  position,
  setPosition,
  isDragging,
  setIsDragging,
  aimDuration,
  setAimDuration,
  lastShotTime,
  setLastShotTime
}) => {
  // Use custom hooks for bird generation and movement
  useBirdGenerator(birds, setBirds, score, gameContainerRef);
  useBirdMovement(birds, setBirds);
  
  // Use aiming controls hook
  useAimingControls(
    gameContainerRef,
    position,
    setPosition,
    isDragging,
    setIsDragging,
    isReloading,
    showGameOver,
    shootAtPosition
  );
  
  // Track aiming duration
  useEffect(() => {
    let aimTimer;
    
    if (isDragging) {
      aimTimer = setInterval(() => {
        setAimDuration(prev => prev + 100);
      }, 100);
    } else {
      setAimDuration(0);
    }
    
    return () => clearInterval(aimTimer);
  }, [isDragging, setAimDuration]);
  
  // Shooting logic
  function shootAtPosition() {
    // Don't allow shooting if game is over
    if (showGameOver) return;
    
    // Prevent rapid multiple shots by checking time since last shot
    const currentTime = Date.now();
    if (currentTime - lastShotTime < 300) { // 300ms debounce
      return;
    }
    setLastShotTime(currentTime);
    
    if (ammo > 0) {
      setAmmo(prev => {
        // If this shot will use the last bullet, automatically reload
        if (prev === 1 && !isReloading) {
          setTimeout(() => reload(), 500); // Slight delay before auto-reload
        }
        return prev - 1;
      });
      playSound('shot');
      
      // Find the closest bird that was hit
      let closestHitBird = null;
      let closestDistance = Infinity;
      
      birds.forEach(bird => {
        const hitRadius = bird.size * 0.8; // Reduced hit radius for more precision
        const birdCenterX = bird.x + (bird.size / 2); // More accurate center calculation
        const birdCenterY = bird.y + (bird.size / 2);
        
        const distance = Math.sqrt(
          Math.pow(position.x - birdCenterX, 2) + 
          Math.pow(position.y - birdCenterY, 2)
        );
        
        if (distance <= hitRadius && distance < closestDistance) {
          closestDistance = distance;
          closestHitBird = bird;
        }
      });
      
      // If a bird was hit, remove only that one bird
      if (closestHitBird) {
        stopSound('birdFly');
        playSound('birdHit', 2000);
        setScore(prev => prev + 1);
        
        setBirds(prevBirds => 
          prevBirds.filter(bird => bird.id !== closestHitBird.id)
        );
      }
    } else {
      reload();
    }
  }

  return (
    <>
      {/* Background clouds */}
      {clouds.map(cloud => (
        <Cloud key={cloud.id} cloud={cloud} />
      ))}
      
      <GameHUD 
        score={score}
        timeRemaining={timeRemaining}
        ammo={ammo}
        isReloading={isReloading}
        reload={reload}
        showGameOver={showGameOver}
      />
      
      {showGameOver && (
        <GameOver score={score} onPlayAgain={handleStartGame} />
      )}
      
      {/* Only render game elements if game is not over */}
      {!showGameOver && (
        <>
          {birds.map(bird => (
            <Bird key={bird.id} bird={bird} />
          ))}
          
          <Gun 
            isDragging={isDragging}
            aimDuration={aimDuration}
            isReloading={isReloading}
          />
          
          {isDragging && (
            <div 
              className="aim-dot"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default GameContainer;