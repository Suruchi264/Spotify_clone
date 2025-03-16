import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/common/Card';
import TrackList from '../components/tracks/TrackList';
import './SearchResultsPage.css';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState({
    topResult: null,
    songs: [],
    artists: [],
    albums: [],
    playlists: [],
    podcasts: []
  });

  useEffect(() => {
    if (query) {
      // Simulate API call with mock data
      setResults({
        topResult: {
          id: 1,
          name: 'Taylor Swift',
          type: 'artist',
          imageUrl: 'https://www.koimoi.com/wp-content/new-galleries/2023/05/midnight-rain-despite-downpour-taylor-swift-doesnt-let-nashville-down-001.jpg',
          followers: '82.5M followers'
        },
        songs: [
          {
            id: 1,
            title: 'Anti-Hero',
            artist: 'Taylor Swift',
            album: 'Midnights',
            duration: 200,
            albumCover: 'https://www.koimoi.com/wp-content/new-galleries/2023/05/midnight-rain-despite-downpour-taylor-swift-doesnt-let-nashville-down-001.jpg'
          },
          // Add more songs
        ],
        artists: [
          {
            id: 1,
            name: 'Taylor Swift',
            imageUrl: 'https://www.koimoi.com/wp-content/new-galleries/2023/05/midnight-rain-despite-downpour-taylor-swift-doesnt-let-nashville-down-001.jpg',
            type: 'artist'
          },
          // Add more artists
        ],
        albums: [
          {
            id: 1,
            title: 'Midnights',
            artist: 'Taylor Swift',
            imageUrl: 'https://www.koimoi.com/wp-content/new-galleries/2023/05/midnight-rain-despite-downpour-taylor-swift-doesnt-let-nashville-down-001.jpg',
            type: 'album'
          },
          // Add more albums
        ],
        playlists: [
          {
            id: 1,
            title: 'This Is Taylor Swift',
            description: 'All essential Taylor Swift tracks in one playlist.',
            imageUrl: 'https://i.scdn.co/image/ab67706f0000000252feef11af8c9d412769ec5a',
            type: 'playlist'
          },
          // Add more playlists
        ]
      });
    }
  }, [query]);

  return (
    <div className="search-results-page">
      <div className="search-grid">
        <section className="top-result-section">
          <h2>Top result</h2>
          {results.topResult && (
            <div className="top-result-card">
              <img 
                src={results.topResult.imageUrl} 
                alt={results.topResult.name}
                className={results.topResult.type === 'artist' ? 'round' : ''}
              />
              <h3>{results.topResult.name}</h3>
              <span className="result-type">{results.topResult.type}</span>
              {results.topResult.followers && (
                <span className="followers">{results.topResult.followers}</span>
              )}
              <button className="play-button">
                <i className="fas fa-play"></i>
              </button>
            </div>
          )}
        </section>

        <section className="songs-section">
          <h2>Songs</h2>
          <TrackList 
            tracks={results.songs}
            onTrackPlay={(track) => console.log('Playing:', track)}
          />
        </section>
      </div>

      <section className="results-section">
        <h2>Artists</h2>
        <div className="cards-grid">
          {results.artists.map(artist => (
            <Card key={artist.id} item={artist} type="artist" />
          ))}
        </div>
      </section>

      <section className="results-section">
        <h2>Albums</h2>
        <div className="cards-grid">
          {results.albums.map(album => (
            <Card key={album.id} item={album} type="album" />
          ))}
        </div>
      </section>

      <section className="results-section">
        <h2>Playlists</h2>
        <div className="cards-grid">
          {results.playlists.map(playlist => (
            <Card key={playlist.id} item={playlist} type="playlist" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchResultsPage; 