import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './LibraryPage.css';

function LibraryPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('playlists');
  const [loading, setLoading] = useState(false);
  const [library, setLibrary] = useState({
    playlists: [
      { id: 1, title: 'Liked Songs', type: 'playlist', imageUrl: 'https://cdn.prod.website-files.com/5e36e6f21212670638c0d63c/5e39d85cee05be53d238681a_likedSongs.png' },
      { id: 2, title: 'My Playlist #1', type: 'playlist', imageUrl: 'https://www.shutterstock.com/shutterstock/photos/1795845130/display_1500/stock-vector-playlist-neon-sign-vector-music-playlist-neon-poster-design-template-modern-trend-design-night-1795845130.jpg' },
    ],
    albums: [
      { id: 1, title: 'Midnights', artist: 'Taylor Swift', type: 'album', imageUrl: 'https://www.koimoi.com/wp-content/new-galleries/2023/05/midnight-rain-despite-downpour-taylor-swift-doesnt-let-nashville-down-001.jpg' },
    ],
    artists: [
      { id: 1, name: 'Taylor Swift', type: 'artist', imageUrl: 'https://www.koimoi.com/wp-content/new-galleries/2023/05/midnight-rain-despite-downpour-taylor-swift-doesnt-let-nashville-down-001.jpg' },
    ],
  });

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner size="large" />;
    }

    const items = library[activeTab] || [];
    
    return (
      <div className="library-grid">
        {items.map(item => (
          <Card 
            key={item.id}
            item={item}
            type={item.type}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="library-page">
      <div className="library-header">
        <h1>Your Library</h1>
        <div className="library-tabs">
          <button
            className={`tab ${activeTab === 'playlists' ? 'active' : ''}`}
            onClick={() => setActiveTab('playlists')}
          >
            Playlists
          </button>
          <button
            className={`tab ${activeTab === 'albums' ? 'active' : ''}`}
            onClick={() => setActiveTab('albums')}
          >
            Albums
          </button>
          <button
            className={`tab ${activeTab === 'artists' ? 'active' : ''}`}
            onClick={() => setActiveTab('artists')}
          >
            Artists
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}

export default LibraryPage; 