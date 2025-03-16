import { useState } from 'react';
import './Queue.css';

function Queue() {
  const [queue, setQueue] = useState({
    currentTrack: {
      title: 'Anti-Hero',
      artist: 'Taylor Swift',
      album: 'Midnights',
      albumCover: '/albums/midnights.jpg',
      duration: 200
    },
    nextInQueue: [
      {
        id: 1,
        title: 'Lavender Haze',
        artist: 'Taylor Swift',
        album: 'Midnights',
        albumCover: '/albums/midnights.jpg',
        duration: 202
      },
      {
        id: 2,
        title: 'Snow On The Beach',
        artist: 'Taylor Swift',
        album: 'Midnights',
        albumCover: '/albums/midnights.jpg',
        duration: 215
      },
      // Add more tracks
    ]
  });

  return (
    <div className="queue-container">
      <div className="queue-header">
        <h2>Queue</h2>
        <button className="clear-queue">Clear</button>
      </div>

      <div className="now-playing-section">
        <h3>Now playing</h3>
        <div className="queue-track current">
          <img 
            src={queue.currentTrack.albumCover} 
            alt={queue.currentTrack.album} 
          />
          <div className="track-info">
            <span className="track-name">{queue.currentTrack.title}</span>
            <span className="track-artist">{queue.currentTrack.artist}</span>
          </div>
        </div>
      </div>

      <div className="next-in-queue">
        <h3>Next in queue</h3>
        {queue.nextInQueue.map((track, index) => (
          <div key={track.id} className="queue-track">
            <img src={track.albumCover} alt={track.album} />
            <div className="track-info">
              <span className="track-name">{track.title}</span>
              <span className="track-artist">{track.artist}</span>
            </div>
            <div className="track-actions">
              <button className="remove-track">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Queue; 