import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faTasks,
  faQuestionCircle,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../store/useAuth';
import './Navbar.css';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-icon">CA</span>
          <span className="brand-text">Samba Murthy</span>
        </Link>

        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/clients"
                className={`nav-link ${isActive('/clients') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <FontAwesomeIcon icon={faUsers} />
                <span>Client Control</span>
              </Link>

              <Link
                to="/tasks"
                className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <FontAwesomeIcon icon={faTasks} />
                <span>Tasks Mgt</span>
              </Link>
            </>
          )}

          <Link
            to="/help"
            className={`nav-link ${isActive('/help') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span>Help</span>
          </Link>

          <div className="nav-divider" />

          {isAuthenticated ? (
            <div className="nav-user">
              <span className="user-info">
                <FontAwesomeIcon icon={faUser} />
                <span className="user-name">{user?.name}</span>
              </span>
              <button className="nav-btn logout-btn" onClick={() => { logout(); closeMenu(); }}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`nav-link login-link ${isActive('/login') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
