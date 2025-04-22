import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types';

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    username: 'demouser',
    email: 'demo@example.com',
    password: 'password123', // In real app, this would be hashed
    favorites: ['1', '3', '5']
  }
];

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

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('cosmoUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    // In a real app, this would make an API call to validate credentials
    const foundUser = MOCK_USERS.find(u => u.username === username && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    
    // Store user info in localStorage (in real app, store JWT token)
    localStorage.setItem('cosmoUser', JSON.stringify(userWithoutPassword));
  };

  const register = async (username: string, email: string, password: string) => {
    // In a real app, this would make an API call to create a new user
    const userExists = MOCK_USERS.some(u => u.username === username || u.email === email);
    
    if (userExists) {
      throw new Error('Username or email already exists');
    }
    
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // In real app, this would be hashed
      favorites: []
    };
    
    MOCK_USERS.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    
    // Store user info in localStorage (in real app, store JWT token)
    localStorage.setItem('cosmoUser', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('cosmoUser');
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    
    // Update user in MOCK_USERS (in real app, this would make an API call)
    const updatedUser = { ...user, ...userData };
    const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      MOCK_USERS[userIndex] = {
        ...MOCK_USERS[userIndex],
        ...userData,
      };
    }
    
    setUser(updatedUser);
    localStorage.setItem('cosmoUser', JSON.stringify(updatedUser));
  };

  const addToFavorites = (eventId: string) => {
    if (!user) return;
    
    if (!user.favorites.includes(eventId)) {
      const updatedFavorites = [...user.favorites, eventId];
      updateUser({ favorites: updatedFavorites });
    }
  };

  const removeFromFavorites = (eventId: string) => {
    if (!user) return;
    
    const updatedFavorites = user.favorites.filter(id => id !== eventId);
    updateUser({ favorites: updatedFavorites });
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