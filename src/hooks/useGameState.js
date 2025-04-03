import { useState } from 'react';

export const useGameState = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [birds, setBirds] = useState([]);
  const [score, setScore] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [ammo, setAmmo] = useState(5);
  const [isReloading, setIsReloading] = useState(false);
  const [lastHitTime, setLastHitTime] = useState(0);
  const [lastBirdSoundTime, setLastBirdSoundTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [aimDuration, setAimDuration] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(40);
  const [showGameOver, setShowGameOver] = useState(false);
  const [lastShotTime, setLastShotTime] = useState(0);
  
  return {
    position, setPosition,
    birds, setBirds,
    score, setScore,
    isDragging, setIsDragging,
    ammo, setAmmo,
    isReloading, setIsReloading,
    lastHitTime, setLastHitTime,
    lastBirdSoundTime, setLastBirdSoundTime,
    gameStarted, setGameStarted,
    aimDuration, setAimDuration,
    showInstructions, setShowInstructions,
    timeRemaining, setTimeRemaining,
    showGameOver, setShowGameOver,
    lastShotTime, setLastShotTime
  };
};