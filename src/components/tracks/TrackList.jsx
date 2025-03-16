import { useState } from 'react';
import './TrackList.css';

function TrackList({ tracks, onTrackPlay }) {
  const [hoveredTrack, setHoveredTrack] = useState(null);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="track-list-container">
      <div className="track-list-header">
        <div className="track-number">#</div>
        <div className="track-title">TITLE</div>
        <div className="track-album">ALBUM</div>
        <div className="track-date-added">DATE ADDED</div>
        <div className="track-duration">
          <i className="far fa-clock"></i>
        </div>
      </div>

      <div className="tracks">
        {tracks.map((track, index) => (
          <div 
            key={track.id}
            className="track-item"
            onMouseEnter={() => setHoveredTrack(track.id)}
            onMouseLeave={() => setHoveredTrack(null)}
          >
            <div className="track-number">
              {hoveredTrack === track.id ? (
                <button 
                  className="play-button"
                  onClick={() => onTrackPlay(track)}
                >
                  <i className="fas fa-play"></i>
                </button>
              ) : (
                index + 1
              )}
            </div>
            <div className="track-title">
              <img src={track.albumCover} alt={track.album} />
              <div className="track-info">
                <span className="track-name">{track.title}</span>
                <span className="track-artist">{track.artist}</span>
              </div>
            </div>
            <div className="track-album">{track.album}</div>
            <div className="track-date-added">{track.dateAdded}</div>
            <div className="track-duration">
              <button className="like-button">
                <i className="far fa-heart"></i>
              </button>
              {formatDuration(track.duration)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackList; 