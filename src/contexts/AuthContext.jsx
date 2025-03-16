import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for existing session
  useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      // Simulate API call
      const user = {
        id: 1,
        email,
        displayName: 'John Doe',
        imageUrl: 'https://w7.pngwing.com/pngs/945/530/png-transparent-male-avatar-boy-face-man-user-flat-classy-users-icon.png'
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      addToast('Successfully logged in', 'success');
      navigate('/');
    } catch (error) {
      addToast('Failed to login', 'error');
    }
  }, [navigate, addToast]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    addToast('Successfully logged out', 'success');
  }, [navigate, addToast]);

  const updateProfile = useCallback(async (data) => {
    try {
      // Simulate API call
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  }, [user]);

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 