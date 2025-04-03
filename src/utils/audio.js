// Import your sound files
import shotSound from '../assets/shot.mp3';
import birdHitSound from '../assets/bird-hit.mp3';
import birdFlySound from '../assets/bird-fly.mp3';
import reloadSound from '../assets/reload.mp3';

// Audio context approach
const audioContext = { current: null };
const audioBuffers = {
  current: {
    shot: null,
    birdHit: null,
    birdFly: null,
    reload: null
  }
};
const audioLoaded = { current: false };
const activeSources = { current: {} }; // Track active sound sources

// Initialize audio on first user interaction
export const initAudio = () => {
  if (audioLoaded.current) return; // Already initialized
  
  try {
    // Create a single audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext.current = new AudioContext();
    
    // Load all sounds once
    const loadSound = (url, key) => {
      fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.current.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          audioBuffers.current[key] = audioBuffer;
          console.log(`Sound loaded: ${key}`);
        })
        .catch(error => console.error(`Error loading sound ${key}:`, error));
    };
    
    // Load all game sounds
    loadSound(shotSound, 'shot');
    loadSound(birdHitSound, 'birdHit');
    loadSound(birdFlySound, 'birdFly');
    loadSound(reloadSound, 'reload');
    
    audioLoaded.current = true;
  } catch (error) {
    console.error('Failed to initialize audio:', error);
  }
};

// Play sound using the audio context with optional duration limit
export const playSound = (soundKey, durationMs) => {
  if (!audioContext.current || !audioBuffers.current[soundKey]) {
    return; // Audio not initialized or sound not loaded
  }
  
  try {
    // Stop previous instance of this sound if it exists
    if (activeSources.current[soundKey]) {
      try {
        activeSources.current[soundKey].stop();
      } catch (e) {
        // Ignore errors if sound already stopped
      }
    }
    
    // Create a new source node for this playback
    const source = audioContext.current.createBufferSource();
    source.buffer = audioBuffers.current[soundKey];
    
    // Connect to destination
    const gainNode = audioContext.current.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    // Start playback
    source.start(0);
    
    // Store the active source
    activeSources.current[soundKey] = source;
    
    // If duration is specified, fade out and stop after that duration
    if (durationMs) {
      // Schedule a fade out starting slightly before the end time
      // Remove or comment out the unused variable
      // const fadeStart = audioContext.current.currentTime + (durationMs / 1000) - 0.1;
      const fadeEnd = audioContext.current.currentTime + (durationMs / 1000);
      
      // Set initial volume
      gainNode.gain.setValueAtTime(1, audioContext.current.currentTime);
      
      // Fade out to avoid clicks
      gainNode.gain.linearRampToValueAtTime(0, fadeEnd);
      
      // Stop the sound after the duration
      source.stop(fadeEnd);
      
      // Clear the reference after it stops
      setTimeout(() => {
        if (activeSources.current[soundKey] === source) {
          activeSources.current[soundKey] = null;
        }
      }, durationMs);
    }
    
    return source;
  } catch (error) {
    console.error(`Error playing sound ${soundKey}:`, error);
    return null;
  }
};

// Stop a specific sound
export const stopSound = (soundKey) => {
  if (activeSources.current[soundKey]) {
    try {
      activeSources.current[soundKey].stop();
      activeSources.current[soundKey] = null;
    } catch (e) {
      console.error(`Error stopping sound ${soundKey}:`, e);
    }
  }
};

// Clean up audio context
export const cleanupAudio = () => {
  if (audioContext.current) {
    audioContext.current.close().catch(e => console.error('Error closing audio context:', e));
  }
};
