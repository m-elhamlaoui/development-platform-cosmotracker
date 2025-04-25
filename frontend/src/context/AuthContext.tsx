import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { useNavigate } from 'react-router-dom';
import { fetchFavorites, addFavorite, removeFavorite } from '../data/api'; // ✅ Import backend functions
import { updateUserProfile } from '../data/api'; // at the top

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: async () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = localStorage.getItem('cosmoUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to parse stored user', err);
        localStorage.removeItem('cosmoUser');
      }
    }
  }, []);

  const loadFavorites = async () => {
    try {
      const favorites = await fetchFavorites();
      updateUser({ favorites: favorites.map(e => e.id) });
    } catch (error) {
      console.error('Failed to load favorites', error);
    }
  };
  
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8081/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }
  
      const data = await response.json();
  
      const userData: User = {
        username,
        token: data.token,
        favorites: [],
      };
  
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('cosmoUser', JSON.stringify(userData));
  
      await loadFavorites(); // ✅ Load actual favorites
  
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Login failed'
      };
    }
  };
  
  const addToFavorites = async (eventId: string) => {
    if (!user || user.favorites.includes(eventId)) return;
  
    try {
      await addFavorite(eventId);
      updateUser({ favorites: [...user.favorites, eventId] });
    } catch (error) {
      console.error('Failed to add to favorites', error);
    }
  };
  
  const removeFromFavorites = async (eventId: string) => {
    if (!user || !user.favorites.includes(eventId)) return;
  
    try {
      await removeFavorite(eventId);
      const updatedFavorites = user.favorites.filter(id => id !== eventId);
      updateUser({ favorites: updatedFavorites });
    } catch (error) {
      console.error('Failed to remove from favorites', error);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    console.log('[register] Starting registration process');
  
    try {
      console.log('[register] Preparing fetch request');
      const response = await fetch('http://localhost:8081/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      console.log('[register] Request completed, status:', response.status);
  
      const data = await response.json().catch(() => ({}));
      console.log('[register] Response data:', data);
  
      if (!response.ok) {
        console.error('[register] Registration failed:', data);
        throw new Error(data.message || 'Registration failed');
      }
  
      console.log('[register] Registration successful');
      
      return { success: true };
    } catch (err) {
      console.error('[register] Error:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Registration failed' 
      };
    }
  };
  

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('cosmoUser');
    navigate('/');
  };


const updateUser = async (userData: Partial<User>) => {
  if (!user) return;

  try {
    await updateUserProfile(userData);

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('cosmoUser', JSON.stringify(updatedUser));
  } catch (error) {
    console.error('Update failed:', error);
    throw error; 
  }
};


  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    addToFavorites,
    removeFromFavorites
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};