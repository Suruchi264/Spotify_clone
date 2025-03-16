import { usePlayer } from '../../contexts/PlayerContext';
import './Player.css';

function Player() {
  const { 
    currentTrack, 
    isPlaying, 
    playTrack, 
    previousTrack,
    nextTrack,
    volume,
    shuffle,
    repeat, 
    setVolumeLevel,
    toggleShuffle,
    toggleRepeat
  } = usePlayer();

  const handlePlayPause = () => {
    if (currentTrack) {
      playTrack(currentTrack);
    }
  };

  const handleVolumeChange = (e) => {
    setVolumeLevel(parseFloat(e.target.value));
  };

  return (
    <div className="player">
      <div className="current-track">
        {currentTrack ? (
          <>
            <img
              src={currentTrack.imageUrl || 'https://placehold.co/56x56?text=No+Image'}
              alt={currentTrack.title}
              className="current-track-image"
            />
            <div className="track-info">
              <div className="track-name">{currentTrack.title}</div>
              <div className="artist-name">{currentTrack.artist}</div>
            </div>
          </>
        ) : (
          <div className="track-info">
            <div className="no-track-message">Select a track to play</div>
          </div>
        )}
      </div>

      <div className="player-controls">
        <button 
          className={`shuffle-button ${shuffle ? 'active' : ''}`}
          onClick={toggleShuffle}
        >
          <i className="fas fa-random"></i>
        </button>
        <button className="previous-button" onClick={previousTrack}>
          <i className="fas fa-step-backward"></i>
        </button>
        <button 
          className="play-pause-button" 
          onClick={handlePlayPause}
          disabled={!currentTrack}
        >
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <button className="next-button" onClick={nextTrack}>
          <i className="fas fa-step-forward"></i>
        </button>
        <button 
          className={`repeat-button ${repeat ? 'active' : ''}`}
          onClick={toggleRepeat}
        >
          <i className="fas fa-redo"></i>
        </button>
      </div>

      <div className="volume-controls">
        <i className="fas fa-volume-up"></i>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
}

export default Player; 