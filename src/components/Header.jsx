import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          HireHaven
        </Link>

        <nav>
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            {user && (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                {user.userType === 'jobseeker' && (
                  <li><Link to="/applications">My Applications</Link></li>
                )}
              </>
            )}
          </ul>
        </nav>

        <div className="auth-buttons">
          {user ? (
            <div className="user-info">
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span>Welcome, {user.name}</span>
              <Link to="/profile" className="btn btn-outline">
                Profile
              </Link>
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;