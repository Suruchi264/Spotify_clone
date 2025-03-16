import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { SearchProvider } from './contexts/SearchContext';
import AppRoutes from './routes';
import Sidebar from './components/sidebar/Sidebar';
import Player from './components/player/Player';
import './App.css';

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <PlayerProvider>
            <SearchProvider>
              <div className="app">
                <Sidebar />
                <main className="main-content">
                  <AppRoutes />
                </main>
                <Player />
              </div>
            </SearchProvider>
          </PlayerProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
