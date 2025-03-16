import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../contexts/PlayerContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './PlaylistPage.css';

function PlaylistPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { playTrack, addToQueue } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPlaylist({
        id,
        title: "Today's Top Hits",
        description: 'The biggest hits right now.',
        imageUrl: 'https://i1.sndcdn.com/artworks-000897146554-tx5kmw-t500x500.jpg',
        followers: '32,042,651',
        createdBy: 'Spotify',
        tracks: [
          {
            id: 1,
            title: 'Anti-Hero',
            artist: 'Taylor Swift',
            album: 'Midnights',
            addedAt: '2023-10-21',
            duration: '3:20'
          },
          {
            id: 2,
            title: 'Cruel Summer',
            artist: 'Taylor Swift',
            album: 'Lover',
            addedAt: '2023-10-20',
            duration: '2:58'
          },
          // Add more tracks
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="playlist-page">
      <div className="playlist-header">
        <img src={playlist.imageUrl} alt={playlist.title} />
        <div className="playlist-info">
          <span className="playlist-type">PLAYLIST</span>
          <h1>{playlist.title}</h1>
          <p className="playlist-description">{playlist.description}</p>
          <div className="playlist-meta">
            <span className="created-by">{playlist.createdBy}</span>
            <span className="bullet">•</span>
            <span className="followers">{playlist.followers} likes</span>
            <span className="bullet">•</span>
            <span className="tracks-count">{playlist.tracks.length} songs</span>
          </div>
        </div>
      </div>

      <div className="playlist-actions">
        <button 
          className="play-button"
          onClick={() => playTrack(playlist.tracks[0])}
        >
          <i className="fas fa-play"></i>
        </button>
        <button className="like-button">
          <i className="far fa-heart"></i>
        </button>
        <button className="more-button">
          <i className="fas fa-ellipsis"></i>
        </button>
      </div>

      <div className="tracks-list">
        <div className="tracks-header">
          <div className="track-number">#</div>
          <div className="track-title">Title</div>
          <div className="track-album">Album</div>
          <div className="track-date-added">Date added</div>
          <div className="track-duration">
            <i className="fas fa-clock"></i>
          </div>
        </div>

        {playlist.tracks.map((track, index) => (
          <div 
            key={track.id} 
            className="track-item"
            onDoubleClick={() => playTrack(track)}
          >
            <div className="track-number">
              <span className="number">{index + 1}</span>
              <button 
                className="play-track-button"
                onClick={() => playTrack(track)}
              >
                <i className="fas fa-play"></i>
              </button>
            </div>
            <div className="track-title">
              <div className="track-name">{track.title}</div>
              <div className="track-artist">{track.artist}</div>
            </div>
            <div className="track-album">{track.album}</div>
            <div className="track-date-added">{track.addedAt}</div>
            <div className="track-duration">
              <button 
                className="add-to-queue-button"
                onClick={() => addToQueue(track)}
              >
                <i className="fas fa-plus"></i>
              </button>
              <span>{track.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;