import { useEffect, useRef } from 'react';
import './ContextMenu.css';

function ContextMenu({ x, y, items, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const getIcon = (type) => {
    switch (type) {
      case 'add-queue':
        return 'fas fa-list-ul';
      case 'add-playlist':
        return 'fas fa-plus';
      case 'share':
        return 'fas fa-share-alt';
      case 'radio':
        return 'fas fa-broadcast-tower';
      case 'like':
        return 'far fa-heart';
      case 'unlike':
        return 'fas fa-heart';
      case 'remove':
        return 'fas fa-times';
      default:
        return null;
    }
  };

  return (
    <div 
      className="context-menu"
      style={{ top: y, left: x }}
      ref={menuRef}
    >
      {items.map((item, index) => (
        <div key={index}>
          {item.separator ? (
            <div className="separator" />
          ) : (
            <button 
              className="menu-item"
              onClick={() => {
                item.onClick();
                onClose();
              }}
              disabled={item.disabled}
            >
              {getIcon(item.icon) && (
                <i className={getIcon(item.icon)}></i>
              )}
              <span>{item.label}</span>
              {item.subLabel && (
                <span className="sub-label">{item.subLabel}</span>
              )}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ContextMenu; 