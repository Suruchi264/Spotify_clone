import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './SettingsPage.css';

function SettingsPage() {
  const { user, updateSettings } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    language: 'en',
    theme: 'dark',
    autoplay: true,
    crossfade: false,
    crossfadeDuration: 0,
    audioQuality: 'high',
    showFriendActivity: true,
    privateSession: false,
    notifications: {
      email: true,
      push: true,
      newMusic: true,
      playlists: true,
      concerts: true
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [category, setting] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [setting]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateSettings(settings);
      addToast('Settings saved successfully', 'success');
    } catch (error) {
      addToast('Failed to save settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <form onSubmit={handleSubmit} className="settings-form">
        <section className="settings-section">
          <h2>Account</h2>
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              name="theme"
              value={settings.theme}
              onChange={handleChange}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </section>

        <section className="settings-section">
          <h2>Playback</h2>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="autoplay"
              name="autoplay"
              checked={settings.autoplay}
              onChange={handleChange}
            />
            <label htmlFor="autoplay">
              Autoplay similar songs when your music ends
            </label>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="crossfade"
              name="crossfade"
              checked={settings.crossfade}
              onChange={handleChange}
            />
            <label htmlFor="crossfade">
              Allow crossfade between songs
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="audioQuality">Audio Quality</label>
            <select
              id="audioQuality"
              name="audioQuality"
              value={settings.audioQuality}
              onChange={handleChange}
            >
              <option value="low">Normal</option>
              <option value="medium">High</option>
              <option value="high">Very High</option>
            </select>
          </div>
        </section>

        <section className="settings-section">
          <h2>Social</h2>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="showFriendActivity"
              name="showFriendActivity"
              checked={settings.showFriendActivity}
              onChange={handleChange}
            />
            <label htmlFor="showFriendActivity">
              Show friend activity
            </label>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="privateSession"
              name="privateSession"
              checked={settings.privateSession}
              onChange={handleChange}
            />
            <label htmlFor="privateSession">
              Private session
            </label>
          </div>
        </section>

        <section className="settings-section">
          <h2>Notifications</h2>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="notifications.email"
              name="notifications.email"
              checked={settings.notifications.email}
              onChange={handleChange}
            />
            <label htmlFor="notifications.email">
              Email notifications
            </label>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="notifications.push"
              name="notifications.push"
              checked={settings.notifications.push}
              onChange={handleChange}
            />
            <label htmlFor="notifications.push">
              Push notifications
            </label>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="notifications.newMusic"
              name="notifications.newMusic"
              checked={settings.notifications.newMusic}
              onChange={handleChange}
            />
            <label htmlFor="notifications.newMusic">
              New music from artists you follow
            </label>
          </div>
        </section>

        <div className="settings-actions">
          <button 
            type="submit" 
            className="save-button"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="small" /> : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage; 