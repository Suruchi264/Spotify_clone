import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../contexts/PlayerContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './AlbumPage.css';

function AlbumPage() {
  const { id } = useParams();
  const { addToQueue, playTrack } = usePlayer();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAlbum({
        id,
        title: 'Midnights',
        artist: 'Taylor Swift',
        releaseYear: 2022,
        imageUrl: 'https://www.koimoi.com/wp-content/new-galleries/2023/05/midnight-rain-despite-downpour-taylor-swift-doesnt-let-nashville-down-001.jpg',
        tracks: [
          { id: 1, title: 'Lavender Haze', duration: '3:22' },
          { id: 2, title: 'Maroon', duration: '3:38' },
          { id: 3, title: 'Anti-Hero', duration: '3:20' },
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
    <div className="album-page">
      <div className="album-header">
        <img src={album.imageUrl} alt={album.title} />
        <div className="album-info">
          <span className="album-type">Album</span>
          <h1>{album.title}</h1>
          <div className="album-meta">
            <img 
              src={album.imageUrl} 
              alt={album.artist} 
              className="artist-image"
            />
            <span className="artist-name">{album.artist}</span>
            <span className="bullet">•</span>
            <span className="year">{album.releaseYear}</span>
            <span className="bullet">•</span>
            <span className="tracks-count">{album.tracks.length} songs</span>
          </div>
        </div>
      </div>

      <div className="album-actions">
        <button 
          className="play-button"
          onClick={() => playTrack(album.tracks[0])}
        >
          <i className="fas fa-play"></i>
        </button>
        <button 
          className="add-to-library-button"
          onClick={() => console.log('Add to library')}
        >
          <i className="fas fa-heart"></i>
        </button>
        <button className="more-button">
          <i className="fas fa-ellipsis"></i>
        </button>
      </div>

      <div className="tracks-list">
        <div className="tracks-header">
          <div className="track-number">#</div>
          <div className="track-title">Title</div>
          <div className="track-duration">
            <i className="fas fa-clock"></i>
          </div>
        </div>
        {album.tracks.map((track, index) => (
          <div 
            key={track.id} 
            className="track-item"
            onDoubleClick={() => playTrack(track)}
          >
            <div className="track-number">{index + 1}</div>
            <div className="track-title">{track.title}</div>
            <div className="track-duration">{track.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumPage; 