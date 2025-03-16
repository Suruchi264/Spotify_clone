import { useState, useEffect } from 'react';
import './ContentGrid.css';

function ContentGrid({ type, items }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (items) {
      setIsLoading(false);
    }
  }, [items]);

  return (
    <div className="content-grid">
      {isLoading ? (
        <div className="content-grid__skeleton">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : (
        items.map((item) => (
          <div key={item.id} className="content-card">
            <div className="content-card__image">
              <img src={item.imageUrl} alt={item.name} />
              <button className="play-button">
                <span className="play-icon">▶</span>
              </button>
            </div>
            <h3>{item.name}</h3>
            <p>{type === 'album' ? item.artist : item.followers + ' followers'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ContentGrid; 