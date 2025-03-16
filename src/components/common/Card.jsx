import { Link } from 'react-router-dom';
import { usePlayer } from '../../contexts/PlayerContext';
import { useContextMenu } from '../../hooks/useContextMenu';
import './Card.css';

function Card({ item, type }) {
  const { addToQueue, playTrack } = usePlayer();
  const { showContextMenu } = useContextMenu();

  const handleContextMenu = (e) => {
    e.preventDefault();
    showContextMenu(e, [
      {
        label: 'Add to Queue',
        icon: 'add-queue',
        onClick: () => addToQueue(item)
      },
      {
        label: 'Add to Playlist',
        icon: 'add-playlist',
        onClick: () => console.log('Add to playlist')
      },
      { separator: true },
      {
        label: 'Share',
        icon: 'share',
        onClick: () => console.log('Share')
      }
    ]);
  };

  const getLink = () => {
    switch (type) {
      case 'playlist':
        return `/playlist/${item.id}`;
      case 'album':
        return `/album/${item.id}`;
      case 'artist':
        return `/artist/${item.id}`;
      default:
        return '#';
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case 'artist':
        return 'Artist';
      case 'album':
        return item.artist;
      case 'playlist':
        return item.description || `By ${item.owner}`;
      default:
        return '';
    }
  };

  return (
    <div 
      className="card"
      onContextMenu={handleContextMenu}
    >
      <Link to={getLink()} className="card-content">
        <div className="card-image-container">
          <img 
            src={item.imageUrl} 
            alt={item.title || item.name}
            className={type === 'artist' ? 'round' : ''}
          />
          <button 
            className="play-button"
            onClick={(e) => {
              e.preventDefault();
              playTrack(item);
            }}
          >
            <i className="fas fa-play"></i>
          </button>
        </div>
        <div className="card-info">
          <h3>{item.title || item.name}</h3>
          {item.artist && <p>{item.artist}</p>}
          {item.description && (
            <p className="description">{item.description}</p>
          )}
        </div>
      </Link>
    </div>
  );
}

export default Card; 