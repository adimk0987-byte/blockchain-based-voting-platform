import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">SecureVote</div>
        <nav className="nav">
          {isAuthenticated ? (
            <>
              <span>Welcome, {user?.name}</span>
              <button onClick={logout} className="btn btn-secondary" style={{marginLeft: '1rem'}}>
                Logout
              </button>
            </>
          ) : (
            <a href="/login">Login</a>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
