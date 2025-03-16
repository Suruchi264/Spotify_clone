import { useState, useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { useGenre } from '../contexts/GenreContext';
import { usePlayer } from '../contexts/PlayerContext';
import { usePlaylist } from '../contexts/PlaylistContext';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './SearchPage.css';

function SearchPage() {
  const { recentSearches, removeRecentSearch, clearRecentSearches } = useSearch();
  const { selectedGenre, setSelectedGenre, getGenreTracks } = useGenre();
  const { playTrack } = usePlayer();
  const { likeTrack, isTrackLiked } = usePlaylist();
  const [genres, setGenres] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for genres
    setTimeout(() => {
      setGenres([
        { id: 'pop', name: 'Pop', color: '#8D67AB' },
        { id: 'rock', name: 'Rock', color: '#E61E32' },
        { id: 'indie', name: 'Indie', color: '#148A08' },
        { id: 'electronic', name: 'Electronic', color: '#DC148C' },
        { id: 'hiphop', name: 'Hip-Hop', color: '#BA5D07' },
        { id: 'rnb', name: 'R&B', color: '#1E3264' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      setTracks(getGenreTracks(selectedGenre));
    }
  }, [selectedGenre, getGenreTracks]);

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="search-page">
      {recentSearches.length > 0 && (
        <section className="recent-searches">
          <div className="section-header">
            <h2>Recent searches</h2>
            <button 
              className="clear-button"
              onClick={clearRecentSearches}
            >
              Clear all
            </button>
          </div>
          <div className="recent-searches-grid">
            {recentSearches.map((search, index) => (
              <div key={index} className="recent-search-item">
                <span>{search}</span>
                <button 
                  className="remove-button"
                  onClick={() => removeRecentSearch(search)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="genres-section">
        <h2>Browse all</h2>
        <div className="genres-grid">
          {genres.map(genre => (
            <div
              key={genre.id}
              className={`genre-card ${selectedGenre === genre.id ? 'selected' : ''}`}
              style={{ backgroundColor: genre.color }}
              onClick={() => setSelectedGenre(genre.id)}
            >
              <h3>{genre.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {selectedGenre && (
        <section className="genre-tracks">
          <h2>{genres.find(g => g.id === selectedGenre)?.name} Tracks</h2>
          <div className="tracks-grid">
            {tracks.map(track => (
              <Card
                key={track.id}
                item={track}
                onPlay={() => playTrack(track)}
                onLike={() => likeTrack(track)}
                isLiked={isTrackLiked(track.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default SearchPage; 