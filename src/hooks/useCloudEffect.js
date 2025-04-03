import { useState, useEffect } from 'react';

export const useCloudEffect = (gameStarted) => {
  const [clouds, setClouds] = useState([]);
  
  // Generate clouds for the background
  useEffect(() => {
    if (!gameStarted) return;
    
    // Initialize clouds when game starts
    if (clouds.length === 0) {
      const initialClouds = Array(12).fill().map((_, i) => ({
        id: `cloud-${i}`,
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight * 0.6), // Keep clouds in upper 60% of screen
        size: 80 + Math.random() * 120,
        speed: 0.2 + Math.random() * 0.3,
        opacity: 0.4 + Math.random() * 0.3,
        rotation: Math.random() * 10 - 5, // Small random rotation
        yMovement: Math.random() * 0.2 - 0.1, // Vertical drift
        scale: 0.8 + Math.random() * 0.4, // Random scaling
        layer: Math.floor(Math.random() * 3) // Different depth layers
      }));
      setClouds(initialClouds);
    }
    
    // Move clouds
    const cloudInterval = setInterval(() => {
      setClouds(prevClouds => 
        prevClouds.map(cloud => {
          // Adjust speed based on layer (parallax effect)
          const layerSpeedMultiplier = 1 + (cloud.layer * 0.3);
          let newX = cloud.x + (cloud.speed * layerSpeedMultiplier);
          
          // Add subtle vertical movement
          let newY = cloud.y + cloud.yMovement;
          
          // Occasionally change vertical direction
          let newYMovement = cloud.yMovement;
          if (Math.random() < 0.01) {
            newYMovement = Math.random() * 0.2 - 0.1;
          }
          
          // Keep clouds within vertical bounds
          if (newY < 0) {
            newY = 0;
            newYMovement = Math.abs(newYMovement);
          } else if (newY > window.innerHeight * 0.6) {
            newY = window.innerHeight * 0.6;
            newYMovement = -Math.abs(newYMovement);
          }
          
          // Subtle rotation changes
          let newRotation = cloud.rotation;
          if (Math.random() < 0.02) {
            newRotation = cloud.rotation + (Math.random() * 2 - 1);
          }
          
          // Reset cloud position when it moves off screen
          if (newX > window.innerWidth + 100) {
            newX = -200;
            return {
              ...cloud,
              x: newX,
              y: Math.random() * (window.innerHeight * 0.6),
              size: 80 + Math.random() * 120,
              speed: 0.2 + Math.random() * 0.3,
              opacity: 0.4 + Math.random() * 0.3,
              rotation: Math.random() * 10 - 5,
              yMovement: Math.random() * 0.2 - 0.1,
              scale: 0.8 + Math.random() * 0.4
            };
          }
          
          return { 
            ...cloud, 
            x: newX, 
            y: newY,
            yMovement: newYMovement,
            rotation: newRotation
          };
        })
      );
    }, 50);
    
    return () => clearInterval(cloudInterval);
  }, [gameStarted, clouds.length]);
  
  return clouds;
};