import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, Calendar, Home, User, LogOut, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleLogout = () => {
    logout();
    closeMenu();
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Moon className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-white">CosmoTracker</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/') 
                        ? 'bg-primary-900 text-white' 
                        : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center">
                      <Home className="w-4 h-4 mr-1" />
                      Home
                    </span>
                  </Link>
                  <Link 
                    to="/events" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/events') 
                        ? 'bg-primary-900 text-white' 
                        : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      All Events
                    </span>
                  </Link>
                  <Link 
                    to="/monthly" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/monthly') 
                        ? 'bg-primary-900 text-white' 
                        : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      This Month
                    </span>
                  </Link>
                  <Link 
                    to="/favorites" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/favorites') 
                        ? 'bg-primary-900 text-white' 
                        : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Favorites
                    </span>
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/profile') 
                        ? 'bg-primary-900 text-white' 
                        : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      Profile
                    </span>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleLogout}
                    className="text-slate-300 hover:bg-red-900/50 hover:text-white"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/login') 
                        ? 'bg-primary-900 text-white' 
                        : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/register') 
                        ? 'bg-primary-900 text-white' 
                        : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/')
                      ? 'bg-primary-900 text-white'
                      : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                  }`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center">
                    <Home className="w-5 h-5 mr-2" />
                    Home
                  </span>
                </Link>
                <Link
                  to="/events"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/events')
                      ? 'bg-primary-900 text-white'
                      : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                  }`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    All Events
                  </span>
                </Link>
                <Link
                  to="/monthly"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/monthly')
                      ? 'bg-primary-900 text-white'
                      : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                  }`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    This Month
                  </span>
                </Link>
                <Link
                  to="/favorites"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/favorites')
                      ? 'bg-primary-900 text-white'
                      : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                  }`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Favorites
                  </span>
                </Link>
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/profile')
                      ? 'bg-primary-900 text-white'
                      : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                  }`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profile
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-red-900/50 hover:text-white"
                >
                  <span className="flex items-center">
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </span>
                </button>
                {user && (
                  <div className="px-3 py-2 text-sm text-slate-400">
                    Signed in as <span className="font-semibold text-primary-400">{user.username}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/login')
                      ? 'bg-primary-900 text-white'
                      : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                  }`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/register')
                      ? 'bg-primary-900 text-white'
                      : 'text-slate-300 hover:bg-primary-800 hover:text-white'
                  }`}
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;