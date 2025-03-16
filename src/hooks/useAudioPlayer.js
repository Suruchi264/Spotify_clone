import { useState, useRef, useEffect, useCallback } from 'react';

export function useAudioPlayer() {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const loadTrack = useCallback((url) => {
    audioRef.current.src = url;
    audioRef.current.load();
  }, []);

  const play = useCallback(() => {
    audioRef.current.play();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((time) => {
    audioRef.current.currentTime = time;
  }, []);

  const setAudioVolume = useCallback((value) => {
    audioRef.current.volume = value;
    setVolume(value);
    setIsMuted(value === 0);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setAudioVolume(volume || 1);
    } else {
      setAudioVolume(0);
    }
  }, [isMuted, volume, setAudioVolume]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  return {
    isPlaying,
    duration,
    currentTime,
    volume,
    isMuted,
    loadTrack,
    play,
    pause,
    togglePlay,
    seek,
    setVolume: setAudioVolume,
    toggleMute
  };
} 