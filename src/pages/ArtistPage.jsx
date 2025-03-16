import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../contexts/PlayerContext';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './ArtistPage.css';

function ArtistPage() {
  const { id } = useParams();
  const { playTrack } = usePlayer();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setArtist({
        id,
        name: 'Taylor Swift',
        imageUrl: 'https://i.scdn.co/image/ab67616d0000b273eb7289d463cd524a93b722c9',
        monthlyListeners: '82,503,344',
        popularTracks: [
          { id: 1, title: 'Anti-Hero', plays: '802,432,123', duration: '3:20' },
          { id: 2, title: 'Cruel Summer', plays: '654,321,987', duration: '2:58' },
        ],
        albums: [
          { 
            id: 1, 
            title: 'Midnights', 
            imageUrl: 'https://www.koimoi.com/wp-content/new-galleries/2023/05/midnight-rain-despite-downpour-taylor-swift-doesnt-let-nashville-down-001.jpg',
            type: 'album' 
          },
          { 
            id: 2, 
            title: 'Folklore', 
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8eJCY39PbVFvSJFrBGpWdIkVkOWFXDBVBEg&s',
            type: 'album' 
          },
        ],
        relatedArtists: [
          { 
            id: 1, 
            name: 'Lorde', 
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGVf84mYJp6AogRgjSPR1PuoHDi693si0Mg&s',
            type: 'artist' 
          },
          { 
            id: 2, 
            name: 'Lana Del Rey', 
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh56TcBHPXPuCN87dSIXZowt6g0YAt5BNd-w&s',
            type: 'artist' 
          },
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
    <div className="artist-page">
      <div className="artist-header">
        <div className="artist-info">
          <div className="verified-badge">
            <i className="fas fa-check"></i>
            Verified Artist
          </div>
          <h1>{artist.name}</h1>
          <span className="monthly-listeners">
            {artist.monthlyListeners} monthly listeners
          </span>
        </div>
      </div>

      <div className="artist-actions">
        <button 
          className="play-button"
          onClick={() => playTrack(artist.popularTracks[0])}
        >
          <i className="fas fa-play"></i>
        </button>
        <button className="follow-button">
          Follow
        </button>
        <button className="more-button">
          <i className="fas fa-ellipsis"></i>
        </button>
      </div>

      <section className="popular-tracks">
        <h2>Popular</h2>
        <div className="tracks-list">
          {artist.popularTracks.map((track, index) => (
            <div 
              key={track.id} 
              className="track-item"
              onDoubleClick={() => playTrack(track)}
            >
              <div className="track-number">{index + 1}</div>
              <div className="track-info">
                <div className="track-title">{track.title}</div>
                <div className="track-plays">{track.plays} plays</div>
              </div>
              <div className="track-duration">{track.duration}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="discography">
        <h2>Discography</h2>
        <div className="albums-grid">
          {artist.albums.map(album => (
            <Card 
              key={album.id}
              item={album}
              type="album"
            />
          ))}
        </div>
      </section>

      <section className="related-artists">
        <h2>Fans also like</h2>
        <div className="artists-grid">
          {artist.relatedArtists.map(relatedArtist => (
            <Card 
              key={relatedArtist.id}
              item={relatedArtist}
              type="artist"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArtistPage; 