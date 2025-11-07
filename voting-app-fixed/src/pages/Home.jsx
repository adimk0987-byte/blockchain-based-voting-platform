import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ElectionAccess from "../components/election/ElectionAccess";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home">
      <div className="hero-card">
        <h1>VoteSecure Pro</h1>
        <p className="subtitle">
          Professional Digital Voting Platform - Secure, Transparent, Accessible
        </p>
        
        {isAuthenticated ? (
          <div className="user-welcome">
            <h2>Welcome back, {user?.name}!</h2>
            <p>You are logged in as <strong>{user?.role}</strong></p>
            
            <div className="action-buttons">
              {user?.role === "voter" && (
                <>
                  <Link to="/elections" className="btn btn-primary btn-large">
                    🗳️ Browse Elections
                  </Link>
                  <Link to="/vote/ls-2024" className="btn btn-secondary">
                    Quick Vote (LS 2024)
                  </Link>
                </>
              )}
              {(user?.role === "organizer" || user?.role === "admin") && (
                <>
                  <Link to="/organizer" className="btn btn-primary btn-large">
                    📊 Management Dashboard
                  </Link>
                  <Link to="/elections" className="btn btn-secondary">
                    Browse Elections
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="guest-welcome">
            <p>Secure digital voting platform for modern democracy</p>
            <Link to="/login" className="btn btn-primary btn-large">
              Secure Login
            </Link>
          </div>
        )}
      </div>

      {/* Election Access Section */}
      {isAuthenticated && (
        <div className="card">
          <ElectionAccess />
        </div>
      )}

      <div className="features-grid">
        <div className="feature-card">
          <h3>🔒 Secure Verification</h3>
          <p>Aadhaar and Voter ID integration with military-grade encryption</p>
        </div>
        <div className="feature-card">
          <h3>🗳️ Multiple Elections</h3>
          <p>National, State, Local, and Campus elections</p>
        </div>
        <div className="feature-card">
          <h3>👨‍💼 Organizer Tools</h3>
          <p>Create and manage elections with candidate management</p>
        </div>
        <div className="feature-card">
          <h3>🔗 Direct Access</h3>
          <p>Access any election instantly with Election ID</p>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="demo-info">
          <h3>Demo Access:</h3>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span style={{ background: '#dbeafe', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem' }}>
              Voter: Any email
            </span>
            <span style={{ background: '#fef3c7', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem' }}>
              Organizer: organizer@test.com
            </span>
            <span style={{ background: '#fce7f3', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem' }}>
              Admin: admin@test.com
            </span>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
            OTP can be any 6-digit number | Aadhaar: 12 digits | Voter ID: 8+ characters
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
