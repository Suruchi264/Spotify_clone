import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';

function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/spotify-white.png" alt="Spotify" />
      </div>

      <nav className="main-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-home"></i>
          Home
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-search"></i>
          Search
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => isActive ? 'active' : ''}>
          <i className="fas fa-books"></i>
          Your Library
        </NavLink>
      </nav>

      <div className="playlist-section">
        <button className="create-playlist-btn">
          <i className="fas fa-plus"></i>
          Create Playlist
        </button>
        <button className="liked-songs-btn">
          <i className="fas fa-heart"></i>
          Liked Songs
        </button>
      </div>

      <div className="playlists-list">
        {/* Placeholder for user playlists */}
        <NavLink to="/playlist/1">My Playlist #1</NavLink>
        <NavLink to="/playlist/2">Favorites</NavLink>
        <NavLink to="/playlist/3">Summer Hits</NavLink>
      </div>

      <div className="user-section">
        <NavLink to="/settings" className="install-app">
          <i className="fas fa-arrow-down-to-bracket"></i>
          Install App
        </NavLink>
        {user && (
          <NavLink to="/profile" className="user-profile">
            <img src={user.imageUrl || '/default-avatar.png'} alt={user.displayName} />
            {user.displayName}
          </NavLink>
        )}
      </div>
    </aside>
  );
}

export default Sidebar; 