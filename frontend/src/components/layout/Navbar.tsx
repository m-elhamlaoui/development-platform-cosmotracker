// src/components/layout/Navbar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, Calendar, Home, Image, User, LogOut, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu   = () => setIsMenuOpen(false);
  const handleLogout= () => { logout(); closeMenu(); };
  const isActive    = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" onClick={closeMenu} className="flex items-center">
            <Moon className="h-8 w-8 text-primary-500" />
            <span className="ml-2 text-xl font-bold text-white">CosmoTracker</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NavLink to="/"       icon={<Home />}     label="Home"     active={isActive('/')} />
                <NavLink to="/events" icon={<Calendar />} label="All Events" active={isActive('/events')} />
                <NavLink to="/monthly"icon={<Calendar />} label="This Month" active={isActive('/monthly')} />
                <NavLink to="/favorites" icon={<Star />}  label="Favorites" active={isActive('/favorites')} />
                <NavLink to="/profile" icon={<User />}     label="Profile"   active={isActive('/profile')} />
                {/* APOD link now uses <Image /> */}
                <NavLink to="/apod"    icon={<Image />}    label="APOD"      active={isActive('/apod')} />

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
                <NavTextLink to="/login"    label="Login"    active={isActive('/login')} />
                <NavTextLink to="/register" label="Register" active={isActive('/register')} />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <MobileLink to="/"       icon={<Home />}     label="Home"     active={isActive('/')} onClick={closeMenu} />
                <MobileLink to="/events" icon={<Calendar />} label="All Events" active={isActive('/events')} onClick={closeMenu} />
                <MobileLink to="/monthly"icon={<Calendar />} label="This Month" active={isActive('/monthly')} onClick={closeMenu} />
                <MobileLink to="/favorites" icon={<Star />}  label="Favorites" active={isActive('/favorites')} onClick={closeMenu} />
                <MobileLink to="/profile" icon={<User />}     label="Profile"   active={isActive('/profile')} onClick={closeMenu} />
                {/* Mobile APOD link also uses <Image /> */}
                <MobileLink to="/apod"    icon={<Image />}    label="APOD"      active={isActive('/apod')} onClick={closeMenu} />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-red-900/50 hover:text-white"
                >
                  <div className="flex items-center">
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </div>
                </button>
                {user && (
                  <div className="px-3 py-2 text-sm text-slate-400">
                    Signed in as <span className="font-semibold text-primary-400">{user.username}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <NavTextLink to="/login"    label="Login"    active={isActive('/login')} mobile onClick={closeMenu} />
                <NavTextLink to="/register" label="Register" active={isActive('/register')} mobile onClick={closeMenu} />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

/** Helper for desktop icon+text links */
function NavLink({
  to, icon, label, active,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? 'bg-primary-900 text-white'
          : 'text-slate-300 hover:bg-primary-800 hover:text-white'
      }`}
    >
      <div className="flex items-center">
        {/* apply consistent size */}
        {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4 mr-1' })}
        {label}
      </div>
    </Link>
  );
}

/** Helper for desktop text-only links */
function NavTextLink({
  to, label, active, mobile = false, onClick,
}: {
  to: string;
  label: string;
  active: boolean;
  mobile?: boolean;
  onClick?: () => void;
}) {
  const base       = mobile
    ? 'block px-3 py-2 rounded-md text-base font-medium'
    : 'px-3 py-2 rounded-md text-sm font-medium';
  const activeCls  = 'bg-primary-900 text-white';
  const inactiveCls= 'text-slate-300 hover:bg-primary-800 hover:text-white';

  return (
    <Link to={to} onClick={onClick} className={`${base} ${active ? activeCls : inactiveCls}`}>
      {label}
    </Link>
  );
}

/** Helper for mobile icon+text links */
function MobileLink({
  to, icon, label, active, onClick,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        active
          ? 'bg-primary-900 text-white'
          : 'text-slate-300 hover:bg-primary-800 hover:text-white'
      }`}
    >
      <div className="flex items-center">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5 mr-2' })}
        {label}
      </div>
    </Link>
  );
}

export default Navbar;
