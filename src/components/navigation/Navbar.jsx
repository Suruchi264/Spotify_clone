import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__logo">
          <img src="/spotify-white.png" alt="Spotify" />
        </div>
        <div className="navbar__nav-items">
          <Link to="/" className="nav-item">
            <i className="fas fa-home"></i>
            Home
          </Link>
          <Link to="/search" className="nav-item">
            <i className="fas fa-search"></i>
            Search
          </Link>
          <Link to="/library" className="nav-item">
            <i className="fas fa-books"></i>
            Your Library
          </Link>
        </div>

        <div className="navbar__playlists">
          <button className="create-playlist-btn">
            <i className="fas fa-plus"></i>
            Create Playlist
          </button>
          <button className="liked-songs-btn">
            <i className="fas fa-heart"></i>
            Liked Songs
          </button>
        </div>
      </div>
      
      <div className="navbar__right">
        <form className="navbar__search" onSubmit={handleSearch}>
          <i className="fas fa-search"></i>
          <input
            type="search"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="navbar__user">
          <button className="upgrade-btn">Upgrade</button>
          <button className="user-menu-btn" onClick={onLogout}>
            <i className="fas fa-user"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 