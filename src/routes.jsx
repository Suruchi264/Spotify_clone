import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import PlaylistPage from './pages/PlaylistPage';
import AlbumPage from './pages/AlbumPage';
import ArtistPage from './pages/ArtistPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
      
      <Route path="/search" element={
        <ProtectedRoute>
          <SearchPage />
        </ProtectedRoute>
      } />
      
      <Route path="/search/results" element={
        <ProtectedRoute>
          <SearchResultsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/library" element={
        <ProtectedRoute>
          <LibraryPage />
        </ProtectedRoute>
      } />
      
      <Route path="/playlist/:id" element={
        <ProtectedRoute>
          <PlaylistPage />
        </ProtectedRoute>
      } />
      
      <Route path="/album/:id" element={
        <ProtectedRoute>
          <AlbumPage />
        </ProtectedRoute>
      } />
      
      <Route path="/artist/:id" element={
        <ProtectedRoute>
          <ArtistPage />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes; 