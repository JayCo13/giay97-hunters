import { useEffect } from 'react';

export const useAimingControls = (
  gameContainerRef,
  position,
  setPosition,
  isDragging,
  setIsDragging,
  isReloading,
  showGameOver,
  shootAtPosition
) => {
  // Set up mouse and touch controls
  useEffect(() => {
    if (!gameContainerRef.current || showGameOver) return;
    
    const container = gameContainerRef.current;
    
    const handleMouseDown = (e) => {
      if (showGameOver || isReloading) return;
      setIsDragging(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    const handleMouseUp = (e) => {
      if (isDragging && !isReloading) {
        shootAtPosition();
      }
      setIsDragging(false);
    };
    
    const handleTouchStart = (e) => {
      if (showGameOver || isReloading) return;
      setIsDragging(true);
      if (e.touches && e.touches[0]) {
        setPosition({ 
          x: e.touches[0].clientX, 
          y: e.touches[0].clientY 
        });
      }
    };
    
    const handleTouchMove = (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      
      if (isDragging && e.touches && e.touches[0]) {
        setPosition({ 
          x: e.touches[0].clientX, 
          y: e.touches[0].clientY 
        });
      }
    };
    
    const handleTouchEnd = (e) => {
      if (isDragging && !isReloading) {
        shootAtPosition();
      }
      setIsDragging(false);
    };
    
    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', () => setIsDragging(false));
    
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', () => setIsDragging(false));
    
    // Clean up
    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', () => setIsDragging(false));
      
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', () => setIsDragging(false));
    };
  }, [gameContainerRef, isDragging, isReloading, position, setIsDragging, setPosition, shootAtPosition, showGameOver]);
};