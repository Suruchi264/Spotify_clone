import { createContext, useContext, useState, useRef, useCallback } from 'react';
import { useToast } from './ToastContext';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const { addToast } = useToast();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [volume, setVolume] = useState(1);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  // Handle track ending
  audioRef.current.onended = () => {
    if (repeat) {
      audioRef.current.play();
    } else {
      nextTrack();
    }
  };

  const playTrack = useCallback((track) => {
    try {
      if (currentTrack?.id === track.id) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
        return;
      }

      setCurrentTrack(track);
      audioRef.current.src = track.audioUrl || `https://api.example.com/tracks/${track.id}/stream`;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Playback failed:', error);
          addToast('Failed to play track', 'error');
        });
    } catch (error) {
      console.error('Playback error:', error);
      addToast('Failed to play track', 'error');
    }
  }, [currentTrack, isPlaying, addToast]);

  const previousTrack = useCallback(() => {
    // Implementation for previous track
    addToast('Previous track not available', 'info');
  }, [addToast]);

  const nextTrack = useCallback(() => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue(prev => prev.slice(1));
      playTrack(nextTrack);
    } else {
      addToast('No more tracks in queue', 'info');
    }
  }, [queue, playTrack, addToast]);

  const toggleShuffle = useCallback(() => {
    setShuffle(prev => !prev);
    addToast(`Shuffle ${!shuffle ? 'enabled' : 'disabled'}`, 'info');
  }, [shuffle, addToast]);

  const toggleRepeat = useCallback(() => {
    setRepeat(prev => !prev);
    addToast(`Repeat ${!repeat ? 'enabled' : 'disabled'}`, 'info');
  }, [repeat, addToast]);

  const setVolumeLevel = useCallback((level) => {
    audioRef.current.volume = level;
    setVolume(level);
  }, []);

  const addToQueue = useCallback((track) => {
    setQueue(prev => [...prev, track]);
    addToast('Added to queue', 'success');
  }, [addToast]);

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      queue,
      volume,
      shuffle,
      repeat,
      playTrack,
      previousTrack,
      nextTrack,
      toggleShuffle,
      toggleRepeat,
      setVolumeLevel,
      addToQueue
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
} 