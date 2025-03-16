import { useState } from 'react';
import { usePlaylist } from '../../contexts/PlaylistContext';
import './PlaylistModal.css';

function PlaylistModal({ track, onClose }) {
  const { playlists, userPlaylists, createPlaylist, addToPlaylist } = usePlaylist();
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      const playlistId = createPlaylist(newPlaylistName);
      if (track) {
        addToPlaylist(playlistId, track);
      }
      onClose();
    }
  };

  const handleAddToPlaylist = (playlistId) => {
    addToPlaylist(playlistId, track);
    onClose();
  };

  return (
    <div className="playlist-modal-overlay" onClick={onClose}>
      <div className="playlist-modal" onClick={e => e.stopPropagation()}>
        <h2>Add to Playlist</h2>
        
        {showCreateNew ? (
          <div className="create-playlist-form">
            <input
              type="text"
              placeholder="Playlist name"
              value={newPlaylistName}
              onChange={e => setNewPlaylistName(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={() => setShowCreateNew(false)}>Cancel</button>
              <button onClick={handleCreatePlaylist}>Create</button>
            </div>
          </div>
        ) : (
          <>
            <button 
              className="create-new-button"
              onClick={() => setShowCreateNew(true)}
            >
              <i className="fas fa-plus"></i>
              Create New Playlist
            </button>
            
            <div className="playlists-list">
              {userPlaylists.map(playlist => (
                <button
                  key={playlist.id}
                  className="playlist-item"
                  onClick={() => handleAddToPlaylist(playlist.id)}
                >
                  {playlist.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PlaylistModal; 