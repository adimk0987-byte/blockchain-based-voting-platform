import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="home">
      <div className="card">
        <h1>Welcome to SecureVote</h1>
        <p>Secure, transparent, and accessible digital voting platform.</p>
        
        {isAuthenticated ? (
          <div>
            <p>Welcome back, {user?.name}! You are logged in as {user?.role}.</p>
            {user?.role === 'voter' && (
              <Link to="/vote/sample-election" className="btn">
                View Your Ballot
              </Link>
            )}
            {user?.role === 'organizer' && (
              <Link to="/organizer" className="btn">
                Manage Elections
              </Link>
            )}
          </div>
        ) : (
          <div>
            <p>Please log in to access your voting dashboard.</p>
            <Link to="/login" className="btn">
              Login to Vote
            </Link>
          </div>
        )}
      </div>

      <div className="card">
        <h2>Features</h2>
        <ul>
          <li>Secure encrypted voting</li>
          <li>Multiple voting types (Ranked Choice, Approval, etc.)</li>
          <li>Real-time results</li>
          <li>Audit trails</li>
          <li>Accessibility focused</li>
        </ul>
      </div>
    </div>
  )
}

export default Home
