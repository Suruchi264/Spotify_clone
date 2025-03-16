import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  const addRecentSearch = useCallback((query) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== query);
      const updated = [query, ...filtered].slice(0, 8);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeRecentSearch = useCallback((query) => {
    setRecentSearches(prev => {
      const updated = prev.filter(item => item !== query);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  }, []);

  const handleSearch = useCallback((query) => {
    if (query.trim()) {
      setSearchQuery(query);
      addRecentSearch(query);
      navigate(`/search/results?q=${encodeURIComponent(query)}`);
    }
  }, [navigate, addRecentSearch]);

  const value = {
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    handleSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 