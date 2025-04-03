import { useEffect } from 'react';

export const useBirdMovement = (birds, setBirds) => {
  // Move birds across the screen
  useEffect(() => {
    if (birds.length === 0) return;
    
    const moveBirdsInterval = setInterval(() => {
      setBirds(prevBirds => 
        prevBirds.map(bird => {
          // Calculate new X position based on direction and speed
          // Apply a speed multiplier to make birds faster
          const speedMultiplier = 2.5;
          let newX = bird.x + (bird.direction === 'right' ? bird.speed * speedMultiplier : -bird.speed * speedMultiplier);
          
          // Calculate new Y position with some vertical movement
          // Update the y-change counter
          let newYChange = bird.yChange + 1;
          if (newYChange > 30) {
            newYChange = 0;
            // Randomly change vertical direction
            bird.yDirection = Math.random() < 0.5 ? 1 : -1;
          }
          
          // Apply vertical movement - also increase vertical speed
          let newY = bird.y + (bird.ySpeed * bird.yDirection * 1.3);
          
          // Keep birds within vertical bounds
          if (newY < 50) {
            newY = 50;
            bird.yDirection = 1;
          } else if (newY > window.innerHeight - 150) {
            newY = window.innerHeight - 150;
            bird.yDirection = -1;
          }
          
          // Remove birds that have gone off screen
          if ((bird.direction === 'right' && newX > window.innerWidth + 100) || 
              (bird.direction === 'left' && newX < -100)) {
            return null;
          }
          
          return {
            ...bird,
            x: newX,
            y: newY,
            yChange: newYChange
          };
        }).filter(bird => bird !== null)
      );
    }, 50);
    
    return () => clearInterval(moveBirdsInterval);
  }, [birds.length, setBirds]);
};