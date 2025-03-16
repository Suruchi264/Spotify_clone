import { useState } from 'react';
import './QueueManager.css';

export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const queueState = {
    queue,
    currentTrack: queue[currentTrackIndex],
    addToQueue: (track) => {
      setQueue(prev => [...prev, track]);
    },
    removeFromQueue: (index) => {
      setQueue(prev => prev.filter((_, i) => i !== index));
    },
    playNext: () => {
      if (currentTrackIndex < queue.length - 1) {
        setCurrentTrackIndex(prev => prev + 1);
      }
    },
    playPrevious: () => {
      if (currentTrackIndex > 0) {
        setCurrentTrackIndex(prev => prev - 1);
      }
    }
  };

  return (
    <div className="queue-container">
      {children}
      <QueueDisplay queueState={queueState} />
    </div>
  );
}

function QueueDisplay({ queueState }) {
  const { queue, currentTrack, removeFromQueue } = queueState;

  if (queue.length === 0) {
    return null;
  }

  return (
    <div className="queue-display">
      <h2>Queue</h2>
      <div className="queue-list">
        {queue.map((track, index) => (
          <div 
            key={track.id} 
            className={`queue-item ${currentTrack?.id === track.id ? 'active' : ''}`}
          >
            <img src={track.artwork} alt={track.title} />
            <div className="queue-item__info">
              <h4>{track.title}</h4>
              <p>{track.artist}</p>
            </div>
            <button onClick={() => removeFromQueue(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
} 