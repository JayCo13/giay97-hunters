import React from 'react';
import bird1Image from '../assets/bird1.png';
import bird2Image from '../assets/bird2.png';

const Bird = ({ bird, isMobile, ...otherProps }) => {
  // Calculate if bird is in the safe zone (avoid bottom area on mobile)
  const isInSafeZone = isMobile ? 
    bird.y < window.innerHeight * 0.7 : // Keep birds in top 70% on mobile
    true; // No restrictions on desktop

  // Don't render birds that would appear in the control area on mobile
  if (isMobile && !isInSafeZone) {
    return null;
  }

  return (
    <div 
      className="bird"
      style={{
        position: 'absolute',
        left: `${bird.x}px`,
        top: `${bird.y}px`,
        width: `${bird.size}px`,
        height: `${bird.size}px`,
        transform: `scaleX(${bird.direction === 'right' ? -1 : 1})`,
        zIndex: 5,
      }}
    >
      <img 
        src={bird.birdType === 'bird1' ? bird1Image : bird2Image} 
        alt="Bird" 
        width="100%" 
        height="100%" 
        style={{ objectFit: 'contain' }}
        onError={(e) => {
          console.error('Bird image failed to load:', e);
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
};

export default Bird;