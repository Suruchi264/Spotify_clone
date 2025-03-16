import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './ProfilePage.css';

function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    imageUrl: user?.imageUrl || ''
  });

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to your storage service
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          imageUrl: e.target?.result || ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      addToast('Profile updated successfully', 'success');
    } catch (error) {
      addToast('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-image-section">
          <img 
            src={formData.imageUrl || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'} 
            alt={formData.displayName}
            className="profile-image"
          />
          <div className="image-upload">
            <label htmlFor="imageUpload" className="upload-button">
              Change photo
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="displayName">Display name</label>
          <input
            type="text"
            id="displayName"
            value={formData.displayName}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              displayName: e.target.value
            }))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            disabled
          />
          <span className="helper-text">
            Email cannot be changed
          </span>
        </div>

        <div className="profile-actions">
          <button 
            type="submit" 
            className="save-button"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="small" /> : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage; 