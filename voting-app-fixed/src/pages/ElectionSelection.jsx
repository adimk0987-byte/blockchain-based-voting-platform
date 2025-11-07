import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ElectionSelection = () => {
  const navigate = useNavigate();
  const { user, idVerified, elections } = useAuth();
  const [selectedElection, setSelectedElection] = useState(null);

  const handleElectionSelect = (election) => {
    setSelectedElection(election);
  };

  const handleProceedToVote = () => {
    if (!selectedElection) return;
    
    if (!idVerified) {
      alert("Please complete ID verification before voting.");
      navigate("/login");
      return;
    }
    
    navigate(`/vote/${selectedElection.id}`);
  };

  // Group elections by type for better organization
  const nationalElections = elections.filter(e => e.type === "National");
  const stateElections = elections.filter(e => e.type === "State");
  const campusElections = elections.filter(e => e.type === "Campus");
  const otherElections = elections.filter(e => !["National", "State", "Campus"].includes(e.type));

  return (
    <div className="election-selection">
      <div className="hero-card">
        <h1>Select Election</h1>
        <p className="subtitle">
          Choose which election you want to participate in
        </p>
        
        {user && (
          <div className="user-info">
            <p>Welcome, <strong>{user.name}</strong> ({user.role})</p>
            {idVerified && (
              <div className="verification-badge" style={{marginTop: '0.5rem'}}>
                 Identity Verified
              </div>
            )}
          </div>
        )}
      </div>

      {/* Direct Election Access Card */}
      <div className="card">
        <h3>Quick Access</h3>
        <p>Go directly to any election using its ID</p>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'end'}}>
          <div style={{flex: 1}}>
            <input
              type="text"
              className="form-input"
              placeholder="Enter Election ID (e.g., ls-2024)"
              onChange={(e) => {
                const election = elections.find(el => el.id === e.target.value);
                if (election) setSelectedElection(election);
              }}
            />
          </div>
          <button 
            className="btn btn-primary"
            onClick={handleProceedToVote}
            disabled={!selectedElection}
          >
            Go to Election
          </button>
        </div>
        <div style={{marginTop: '1rem'}}>
          <small>Try: ls-2024 (National), delhi-assembly (State), du-elections (Campus)</small>
        </div>
      </div>

      {/* National Elections */}
      {nationalElections.length > 0 && (
        <div className="card">
          <h2> National Elections</h2>
          <p>Country-wide elections for national governance</p>
          
          <div className="election-list">
            {nationalElections.map(election => (
              <div
                key={election.id}
                className={`election-item ${selectedElection?.id === election.id ? "selected" : ""}`}
                onClick={() => handleElectionSelect(election)}
              >
                <div className="election-info">
                  <h3>{election.name}</h3>
                  <p>{election.description}</p>
                  <div className="election-meta">
                    <span>📍 {election.constituency}</span>
                    <span>📅 {election.date}</span>
                    <span>👥 {election.candidates.length} Candidates</span>
                    <span className={`status ${election.status}`}>
                      {election.status === "active" ? "🟢 Voting Open" : 
                       election.status === "upcoming" ? " Coming Soon" : " Completed"}
                    </span>
                  </div>
                </div>
                {selectedElection?.id === election.id && (
                  <div className="selection-indicator"> Selected</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* State Elections */}
      {stateElections.length > 0 && (
        <div className="card">
          <h2> State Elections</h2>
          <p>Elections for state legislative assemblies</p>
          
          <div className="election-list">
            {stateElections.map(election => (
              <div
                key={election.id}
                className={`election-item ${selectedElection?.id === election.id ? "selected" : ""}`}
                onClick={() => handleElectionSelect(election)}
              >
                <div className="election-info">
                  <h3>{election.name}</h3>
                  <p>{election.description}</p>
                  <div className="election-meta">
                    <span>📍 {election.constituency}</span>
                    <span>📅 {election.date}</span>
                    <span> {election.candidates.length} Candidates</span>
                    <span className={`status ${election.status}`}>
                      {election.status === "active" ? " Voting Open" : 
                       election.status === "upcoming" ? " Coming Soon" : " Completed"}
                    </span>
                  </div>
                </div>
                {selectedElection?.id === election.id && (
                  <div className="selection-indicator"> Selected</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Campus Elections */}
      {campusElections.length > 0 && (
        <div className="card">
          <h2> Campus Elections</h2>
          <p>University and college student union elections</p>
          
          <div className="election-list">
            {campusElections.map(election => (
              <div
                key={election.id}
                className={`election-item ${selectedElection?.id === election.id ? "selected" : ""}`}
                onClick={() => handleElectionSelect(election)}
              >
                <div className="election-info">
                  <h3>{election.name}</h3>
                  <p>{election.description}</p>
                  <div className="election-meta">
                    <span> {election.constituency}</span>
                    <span> {election.date}</span>
                    <span> {election.candidates.length} Candidates</span>
                    <span className={`status ${election.status}`}>
                      {election.status === "active" ? " Voting Open" : 
                       election.status === "upcoming" ? " Coming Soon" : " Completed"}
                    </span>
                  </div>
                </div>
                {selectedElection?.id === election.id && (
                  <div className="selection-indicator"> Selected</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Elections */}
      {otherElections.length > 0 && (
        <div className="card">
          <h2> Other Elections</h2>
          <p>Local, corporate, and other election types</p>
          
          <div className="election-list">
            {otherElections.map(election => (
              <div
                key={election.id}
                className={`election-item ${selectedElection?.id === election.id ? "selected" : ""}`}
                onClick={() => handleElectionSelect(election)}
              >
                <div className="election-info">
                  <h3>{election.name}</h3>
                  <p>{election.description}</p>
                  <div className="election-meta">
                    <span> {election.type}</span>
                    <span> {election.constituency}</span>
                    <span> {election.date}</span>
                    <span> {election.candidates.length} Candidates</span>
                    <span className={`status ${election.status}`}>
                      {election.status === "active" ? " Voting Open" : 
                       election.status === "upcoming" ? " Coming Soon" : " Completed"}
                    </span>
                  </div>
                </div>
                {selectedElection?.id === election.id && (
                  <div className="selection-indicator"> Selected</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Section */}
      <div className="card">
        <div className="ballot-actions">
          {selectedElection && (
            <div className="selected-election-info">
              <h4>Selected Election:</h4>
              <p><strong>{selectedElection.name}</strong></p>
              <p>{selectedElection.description}</p>
              <p>Type: {selectedElection.type} | Constituency: {selectedElection.constituency}</p>
            </div>
          )}
          
          <button 
            className="btn btn-primary btn-large" 
            onClick={handleProceedToVote}
            disabled={!selectedElection}
          >
            {selectedElection ? `Vote in ${selectedElection.name}` : "Select an Election"}
          </button>
          
          {!idVerified && selectedElection && (
            <p style={{color: '#dc2626', marginTop: '1rem', textAlign: 'center'}}>
               Please complete ID verification to vote in this election
            </p>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Election Information</h3>
        <div className="election-instructions">
          <p><strong>How to vote:</strong></p>
          <ol style={{marginLeft: '1.5rem', marginTop: '0.5rem'}}>
            <li>Select an election from the list above or enter Election ID</li>
            <li>Complete ID verification if not already done</li>
            <li>Review the candidates and their profiles</li>
            <li>Cast your vote securely</li>
            <li>Receive your voting receipt</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ElectionSelection;
