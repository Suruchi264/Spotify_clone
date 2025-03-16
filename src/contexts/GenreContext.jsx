import { createContext, useContext, useState } from 'react';

const GenreContext = createContext();

const genreData = {
  pop: [
    {
      id: 'pop1',
      title: 'Anti-Hero',
      artist: 'Taylor Swift',
      audioUrl: 'URL_TO_AUDIO',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Taylor_Swift_-_Anti-Hero.png'
    },
    // Add more pop songs
  ],
  rock: [
    {
      id: 'rock1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      audioUrl: 'URL_TO_AUDIO',
      imageUrl: 'URL_TO_IMAGE'
    },
    // Add more rock songs
  ],
  indie: [
    // Add indie songs
  ],
  electronic: [
    // Add electronic songs
  ],
  hiphop: [
    // Add hip-hop songs
  ],
  rnb: [
    // Add R&B songs
  ]
};

export function GenreProvider({ children }) {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const getGenreTracks = (genre) => {
    return genreData[genre] || [];
  };

  return (
    <GenreContext.Provider value={{
      selectedGenre,
      setSelectedGenre,
      getGenreTracks
    }}>
      {children}
    </GenreContext.Provider>
  );
}

export function useGenre() {
  return useContext(GenreContext);
} 