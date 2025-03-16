import { usePlaylist } from '../../contexts/PlaylistContext';
import './TrackControls.css';

function TrackControls({ track }) {
  const { likeTrack, isTrackLiked } = usePlaylist();

  return (
    <div className="track-controls">
      <button 
        className={`like-button ${isTrackLiked(track.id) ? 'active' : ''}`}
        onClick={() => likeTrack(track)}
      >
        <i className="fas fa-heart"></i>
      </button>
    </div>
  );
}

export default TrackControls; 