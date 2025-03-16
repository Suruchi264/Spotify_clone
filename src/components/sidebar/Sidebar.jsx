import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img 
          src="https://cdn.pixabay.com/photo/2016/10/22/00/15/spotify-1759471_1280.jpg"
          alt="Spotify"
          className="spotify-logo"
        />
      </div>
      
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/" className="nav-link active">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="nav-link">
              <i className="fas fa-search"></i>
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="/library" className="nav-link">
              <i className="fas fa-book-open"></i>
              <span>Your Library</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="playlist-section">
        <div className="playlist-actions">
          <button className="action-button">
            <div className="icon-container">
              <i className="fas fa-plus"></i>
            </div>
            <span>Create Playlist</span>
          </button>
          <button className="action-button">
            <div className="icon-container liked-songs">
              <i className="fas fa-heart"></i>
            </div>
            <span>Liked Songs</span>
          </button>
        </div>

        <div className="separator"></div>

        <div className="playlists-container">
          <ul className="playlist-list">
            <li>
              <Link to="/playlist/1">My Playlist #1</Link>
            </li>
            <li>
              <Link to="/playlist/2">Summer Hits</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 