import { useState, useEffect } from 'react';
import './NowPlayingBar.css';

function NowPlayingBar() {
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    album: 'Midnights',
    albumCover: '/albums/midnights.jpg',
    duration: 200,
    currentTime: 0
  });

  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // none, track, queue

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleRepeat = () => {
    const modes = ['none', 'track', 'queue'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  return (
    <div className="now-playing-bar">
      <div className="now-playing-left">
        <img 
          src={currentTrack.albumCover} 
          alt={currentTrack.album} 
          className="now-playing-cover"
        />
        <div className="now-playing-info">
          <div className="track-info">
            <span className="track-name">{currentTrack.title}</span>
            <span className="track-artist">{currentTrack.artist}</span>
          </div>
          <button className="like-button">
            <i className="far fa-heart"></i>
          </button>
          <button className="picture-in-picture-button">
            <i className="fas fa-tv"></i>
          </button>
        </div>
      </div>

      <div className="now-playing-center">
        <div className="player-controls">
          <button 
            className={`control-button ${isShuffling ? 'active' : ''}`}
            onClick={() => setIsShuffling(!isShuffling)}
          >
            <i className="fas fa-random"></i>
          </button>
          <button className="control-button">
            <i className="fas fa-step-backward"></i>
          </button>
          <button 
            className="play-pause-button"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
          </button>
          <button className="control-button">
            <i className="fas fa-step-forward"></i>
          </button>
          <button 
            className={`control-button ${repeatMode !== 'none' ? 'active' : ''}`}
            onClick={toggleRepeat}
          >
            <i className={`fas fa-repeat${repeatMode === 'track' ? '-1' : ''}`}></i>
          </button>
        </div>

        <div className="playback-bar">
          <span className="playback-time">{formatTime(currentTrack.currentTime)}</span>
          <div className="progress-bar">
            <div 
              className="progress"
              style={{ width: `${(currentTrack.currentTime / currentTrack.duration) * 100}%` }}
            ></div>
          </div>
          <span className="playback-time">{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      <div className="now-playing-right">
        <button className="control-button">
          <i className="fas fa-list"></i>
        </button>
        <button className="control-button">
          <i className="fas fa-desktop"></i>
        </button>
        <button 
          className="control-button"
          onClick={() => setIsMuted(!isMuted)}
        >
          <i className={`fas fa-volume-${isMuted ? 'mute' : 'up'}`}></i>
        </button>
        <div className="volume-bar">
          <div className="progress-bar">
            <div 
              className="progress"
              style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NowPlayingBar; 