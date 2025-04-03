import { useEffect, useState } from 'react';
import { playSound } from '../utils/audio';

export const useBirdGenerator = (birds, setBirds, score) => {
  const [lastBirdSoundTime, setLastBirdSoundTime] = useState(0);
  
  // Generate birds with difficulty scaling
  useEffect(() => {
    const birdInterval = setInterval(() => {
      // Increase maximum bird count based on difficulty level
      let maxBirds = 8;
      if (score >= 10 && score < 20) {
        maxBirds = 12;
      } else if (score >= 20 && score < 30) {
        maxBirds = 16;
      } else if (score >= 30) {
        maxBirds = 20;
      }
      
      if (birds.length < maxBirds) {
        // Create multiple birds at once for a denser appearance
        const birdsToCreate = Math.min(3, maxBirds - birds.length);
        
        const newBirds = [];
        for (let i = 0; i < birdsToCreate; i++) {
          const startFromLeft = Math.random() < 0.5;
          const startX = startFromLeft ? 
            -50 - (Math.random() * 100) : 
            window.innerWidth + 50 + (Math.random() * 100);
          
          const startY = 100 + Math.random() * (window.innerHeight / 2);
          
          // Scale difficulty based on score
          let baseSpeed = 4.5;
          if (score >= 5 && score < 10) {
            baseSpeed = 5.5;
          } else if (score >= 10 && score < 15) {
            baseSpeed = 6.5;
          } else if (score >= 15 && score < 20) {
            baseSpeed = 7.5;
          } else if (score >= 20 && score < 30) {
            baseSpeed = 8.5;
          } else if (score >= 30) {
            baseSpeed = 10;
          }
          
          // Add some randomness to the speed
          const speed = baseSpeed + Math.random() * 3;
          
          const newBird = {
            id: Date.now() + i,
            x: startX,
            y: startY,
            speed: speed,
            direction: startFromLeft ? 'right' : 'left',
            size: 60 + Math.random() * 30,
            birdType: Math.random() < 0.5 ? 'bird1' : 'bird2',
            ySpeed: (Math.random() - 0.5) * 2.5,
            yDirection: 1,
            yChange: 0
          };
          
          newBirds.push(newBird);
        }
        
        setBirds(prevBirds => [...prevBirds, ...newBirds]);
        
        // Only play bird sound once every 5 seconds
        const currentTime = Date.now();
        if (currentTime - lastBirdSoundTime > 5000) {
          playSound('birdFly');
          setLastBirdSoundTime(currentTime);
        }
      }
    }, 1000);
    
    return () => clearInterval(birdInterval);
  }, [birds.length, score, setBirds, lastBirdSoundTime]);
  
  return { lastBirdSoundTime, setLastBirdSoundTime };
};