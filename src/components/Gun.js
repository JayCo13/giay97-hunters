import React from 'react';
import gunImage from '../assets/gun.png';

const Gun = ({ isDragging, aimDuration, isReloading }) => {
  return (
    <div 
      className="gun-container"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 'clamp(120px, 30vh, 200px)',
        zIndex: 10,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.4))',
        backgroundPosition: 'bottom',
        backgroundSize: '100% 100%',
        boxShadow: '0 -10px 20px rgba(0,0,0,0.2)',
        overflow: 'visible',
        paddingBottom: '50px'
      }}
    >
      {/* Wooden table background */}
      <div 
        className="wooden-table"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(90deg, 
              rgba(222, 184, 135, 0.95) 0%, 
              rgba(210, 180, 140, 0.95) 15%, 
              rgba(222, 184, 135, 0.95) 30%, 
              rgba(210, 180, 140, 0.95) 50%,
              rgba(222, 184, 135, 0.95) 70%,
              rgba(210, 180, 140, 0.95) 100%)
          `,
          opacity: 0.95,
          zIndex: -1,
          boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.3)',
          borderTop: '4px solid rgba(180, 150, 100, 0.9)',
          pointerEvents: 'none'
        }}
      >
        {/* Wood grain overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 15px,
              rgba(160, 120, 80, 0.15) 15px,
              rgba(160, 120, 80, 0.15) 20px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(180, 140, 100, 0.08),
              rgba(180, 140, 100, 0.08) 60px,
              rgba(170, 130, 90, 0.15) 60px,
              rgba(170, 130, 90, 0.15) 120px
            )
          `,
          opacity: 0.7
        }}></div>
    
        
        {/* Bullet casings scattered on the table */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '12px',
          height: '20px',
          borderRadius: '2px 2px 12px 12px',
          background: 'linear-gradient(to right, #b5a642, #ffd700, #b5a642)',
          transform: 'rotate(30deg)',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}></div>
           <div style={{
          position: 'absolute',
          top: '40%',
          left: '60%',
          width: '12px',
          height: '20px',
          borderRadius: '2px 2px 12px 12px',
          background: 'linear-gradient(to right, #b5a642, #ffd700, #b5a642)',
          transform: 'rotate(30deg)',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '12px',
          height: '20px',
          borderRadius: '2px 2px 12px 12px',
          background: 'linear-gradient(to right, #b5a642, #ffd700, #b5a642)',
          transform: 'rotate(-15deg)',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '12px',
          height: '20px',
          borderRadius: '2px 2px 12px 12px',
          background: 'linear-gradient(to right, #b5a642, #ffd700, #b5a642)',
          transform: 'rotate(65deg)',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '35%',
          width: '12px',
          height: '20px',
          borderRadius: '2px 2px 12px 12px',
          background: 'linear-gradient(to right, #b5a642, #ffd700, #b5a642)',
          transform: 'rotate(120deg)',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '40%',
          width: '12px',
          height: '20px',
          borderRadius: '2px 2px 12px 12px',
          background: 'linear-gradient(to right, #b5a642, #ffd700, #b5a642)',
          transform: 'rotate(-45deg)',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}></div>
      </div>
      
      <div 
        className={`gun-image ${isDragging ? 'gun-aiming' : ''} ${aimDuration > 0 ? 'gun-firing' : ''} ${isReloading ? 'gun-reloading' : ''}`}
        style={{
          width: 'clamp(200px, 50vw, 300px)',
          height: 'clamp(120px, 30vw, 200px)',
          backgroundImage: `url(${gunImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          transform: isDragging ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.2s ease',
          marginBottom: '10px',
          filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.5))'
        }}
      >
        <div 
          className={`muzzle-flash ${aimDuration > 0 && aimDuration < 300 ? 'active' : ''}`}
          style={{
            position: 'absolute',
            width: 'clamp(15px, 4vw, 30px)',
            height: 'clamp(15px, 4vw, 30px)',
            top: '20%',
            left: '90%',
            background: 'radial-gradient(circle, rgba(255,255,190,1) 0%, rgba(255,165,0,0.8) 50%, rgba(255,0,0,0) 100%)',
            borderRadius: '50%',
            opacity: aimDuration > 0 && aimDuration < 300 ? 1 : 0,
            transform: `scale(${aimDuration > 0 && aimDuration < 300 ? 1 : 0})`,
            transition: 'all 0.1s ease-out'
          }}
        />
      </div>
    </div>
  );
};

export default Gun;