import { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from './ToastContext';

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const { addToast } = useToast();
  const [playlists, setPlaylists] = useState([
    { id: 'liked', name: 'Liked Songs', tracks: [] }
  ]);
  const [userPlaylists, setUserPlaylists] = useState([]);

  const createPlaylist = useCallback((name) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      tracks: []
    };
    setUserPlaylists(prev => [...prev, newPlaylist]);
    addToast('Playlist created successfully', 'success');
    return newPlaylist.id;
  }, [addToast]);

  const addToPlaylist = useCallback((playlistId, track) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        if (playlist.tracks.some(t => t.id === track.id)) {
          addToast('Track already exists in playlist', 'info');
          return playlist;
        }
        return { ...playlist, tracks: [...playlist.tracks, track] };
      }
      return playlist;
    }));
    setUserPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        if (playlist.tracks.some(t => t.id === track.id)) {
          addToast('Track already exists in playlist', 'info');
          return playlist;
        }
        return { ...playlist, tracks: [...playlist.tracks, track] };
      }
      return playlist;
    }));
    addToast('Added to playlist', 'success');
  }, [addToast]);

  const likeTrack = useCallback((track) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === 'liked') {
        if (playlist.tracks.some(t => t.id === track.id)) {
          return {
            ...playlist,
            tracks: playlist.tracks.filter(t => t.id !== track.id)
          };
        }
        return { ...playlist, tracks: [...playlist.tracks, track] };
      }
      return playlist;
    }));
    addToast('Added to Liked Songs', 'success');
  }, [addToast]);

  const isTrackLiked = useCallback((trackId) => {
    const likedPlaylist = playlists.find(p => p.id === 'liked');
    return likedPlaylist.tracks.some(t => t.id === trackId);
  }, [playlists]);

  return (
    <PlaylistContext.Provider value={{
      playlists,
      userPlaylists,
      createPlaylist,
      addToPlaylist,
      likeTrack,
      isTrackLiked
    }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  return useContext(PlaylistContext);
} 