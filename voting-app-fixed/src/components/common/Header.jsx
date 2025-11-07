import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">VoteSecure Pro</div>
        <nav className="nav">
          {isAuthenticated ? (
            <>
              {user?.role === "voter" && (
                <a href="/elections">🗳️ Elections</a>
              )}
              {user?.role === "organizer" && (
                <a href="/organizer">📊 Dashboard</a>
              )}
              {user?.role === "admin" && (
                <a href="/admin">⚙️ Admin</a>
              )}
              <span style={{ 
                background: '#f1f5f9', 
                padding: '0.5rem 1rem', 
                borderRadius: '6px',
                color: '#475569'
              }}>
                👤 {user?.name}
              </span>
              <button
                onClick={logout}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/login">Login</a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
