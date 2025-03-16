import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './HomePage.css';

function HomePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [featuredContent, setFeaturedContent] = useState({
    recentlyPlayed: [],
    featuredPlaylists: [],
    newReleases: []
  });

  useEffect(() => {
    // Simulate API calls
    Promise.all([
      // Fetch recently played
      new Promise(resolve => setTimeout(() => resolve([
        {
          id: 1,
          title: 'Midnights',
          artist: 'Taylor Swift',
          type: 'album',
          imageUrl: 'https://www.koimoi.com/wp-content/new-galleries/2023/05/midnight-rain-despite-downpour-taylor-swift-doesnt-let-nashville-down-001.jpg'
        },
        {
          id: 2,
          title: "Today's Top Hits",
          type: 'playlist',
          imageUrl: 'https://i1.sndcdn.com/artworks-000897146554-tx5kmw-t500x500.jpg'
        }
      ]), 1000)),

      // Fetch featured playlists
      new Promise(resolve => setTimeout(() => resolve([
        {
          id: 1,
          title: 'Discover Weekly',
          type: 'playlist',
          description: 'Your weekly mixtape of fresh music.',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-WA9oTExUwe9X2_MhCfn7rP8ajnorhBpYPvHfFvp5CArZzQ9O-fF9TLie2RGQYhxDkF8&usqp=CAU'
        },
        {
          id: 2,
          title: 'Release Radar',
          type: 'playlist',
          description: 'Catch all the latest music from artists you follow.',
          imageUrl: 'https://preview.redd.it/yo2pn43qf7l61.jpg?width=640&crop=smart&auto=webp&s=9e01e5ad992f850161973545041263de8015cb95'
        }
      ]), 1000)),

      // Fetch new releases
      new Promise(resolve => setTimeout(() => resolve([
        {
          id: 1,
          title: 'Renaissance',
          artist: 'Beyoncé',
          type: 'album',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNf9CqAssHIMk_j11QmRsufx4AREGDobxuw&s'
        },
        {
          id: 2,
          title: 'Midnights',
          artist: 'Taylor Swift',
          type: 'album',
          imageUrl: 'https://www.koimoi.com/wp-content/new-galleries/2023/05/midnight-rain-despite-downpour-taylor-swift-doesnt-let-nashville-down-001.jpg'
        }
      ]), 1000))
    ]).then(([recent, featured, releases]) => {
      setFeaturedContent({
        recentlyPlayed: recent,
        featuredPlaylists: featured,
        newReleases: releases
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="home-page">
      <section className="welcome-section">
        <h1>Good {getTimeOfDay()}, {user?.displayName}</h1>
        <div className="recently-played-grid">
          {featuredContent.recentlyPlayed.map(item => (
            <Card key={item.id} item={item} type={item.type} />
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Playlists</h2>
          <Link to="/featured" className="see-all">See all</Link>
        </div>
        <div className="cards-grid">
          {featuredContent.featuredPlaylists.map(playlist => (
            <Card key={playlist.id} item={playlist} type="playlist" />
          ))}
        </div>
      </section>

      <section className="new-releases-section">
        <div className="section-header">
          <h2>New Releases</h2>
          <Link to="/new-releases" className="see-all">See all</Link>
        </div>
        <div className="cards-grid">
          {featuredContent.newReleases.map(album => (
            <Card key={album.id} item={album} type="album" />
          ))}
        </div>
      </section>
    </div>
  );
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

export default HomePage; 