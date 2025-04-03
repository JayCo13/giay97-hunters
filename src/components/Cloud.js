import React from 'react';

const Cloud = ({ cloud, isMobile }) => {
  // Calculate if cloud is in the safe zone (avoid bottom area on mobile)
  const isInSafeZone = isMobile ? 
    cloud.y < window.innerHeight * 0.7 : // Keep clouds in top 70% on mobile
    true; // No restrictions on desktop

  // Don't render clouds that would appear in the control area on mobile
  if (isMobile && !isInSafeZone) {
    return null;
  }

  return (
    <div
      className="cloud"
      data-layer={cloud.layer || 0}
      style={{
        position: 'absolute',
        left: `${cloud.x}px`,
        top: `${cloud.y}px`,
        width: `${cloud.size}px`,
        height: `${cloud.size * 0.6}px`,
        borderRadius: '40%',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(240,240,255,0.8))',
        boxShadow: `0 5px 15px rgba(0,0,0,0.1)`,
        zIndex: cloud.layer ? cloud.layer + 1 : 1,
        pointerEvents: 'none',
        transform: `scale(1, 0.6) rotate(${cloud.rotation || 0}deg)`,
        transition: 'transform 2s ease-in-out',
        opacity: cloud.opacity
      }}
    >
      <div className="cloud-highlight" style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '30%',
        height: '30%',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.8)'
      }}></div>
    </div>
  );
};

export default Cloud;