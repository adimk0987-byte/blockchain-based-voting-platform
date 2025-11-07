import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const VoterBallot = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { user, idVerified, getElectionById } = useAuth();
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [currentElection, setCurrentElection] = useState(null);

  useEffect(() => {
    if (electionId) {
      const election = getElectionById(electionId);
      if (election) {
        setCurrentElection(election);
      } else {
        alert("Election not found! Redirecting to election selection.");
        navigate("/elections");
      }
    }
  }, [electionId, getElectionById, navigate]);

  const handleVote = async () => {
    if (!selectedChoice) return;
    
    if (!idVerified) {
      alert(" Please complete ID verification before voting.");
      navigate("/login");
      return;
    }
    
    // Simulate vote submission
    setHasVoted(true);
    setTimeout(() => {
      const selectedCandidate = currentElection.candidates.find(c => c.id === selectedChoice);
      alert(`✅ Vote submitted successfully for ${selectedCandidate.name} (${selectedCandidate.party})! Thank you for participating in Indian democracy.`);
      navigate("/");
    }, 2000);
  };

  if (!currentElection) {
    return (
      <div className="ballot-container">
        <div className="card">
          <h2>Loading Election...</h2>
          <p>Please wait while we load the election details.</p>
        </div>
      </div>
    );
  }

  if (!idVerified) {
    return (
      <div className="ballot-container">
        <div className="verification-required">
          <h2> Identity Verification Required</h2>
          <p>Please complete your Aadhaar and Voter ID verification to access the voting ballot.</p>
          <button onClick={() => navigate("/login")} className="btn btn-primary">
            Complete Verification
          </button>
        </div>
      </div>
    );
  }

  if (hasVoted) {
    return (
      <div className="ballot-container">
        <div className="success-card">
          <h2> Vote Submitted Successfully!</h2>
          <p>Your vote has been securely recorded in the system.</p>
          <p>Thank you for participating in Indian democracy.</p>
          <div className="election-commission-seal">
            <h4>Election Commission of India</h4>
            <p>Verified and Secured</p>
          </div>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ballot-container">
      <div className="ballot-card">
        <div className="ballot-header">
          <h1> {currentElection.name}</h1>
          <p>Election Type: <strong>{currentElection.type}</strong></p>
          <p>Constituency: <strong>{currentElection.constituency}</strong></p>
          <p>Verified Voter: <strong>{user?.name}</strong></p>
          <div className="verification-badge">
             Identity Verified (Aadhaar + Voter ID)
          </div>
          <div className="election-id-display">
            Election ID: <strong>{currentElection.id}</strong>
          </div>
        </div>

        <div className="ballot-instructions">
          <h3>Instructions:</h3>
          <p>Select your preferred candidate by clicking on their card</p>
          <small>You can only vote once. Your choice is final and anonymous.</small>
        </div>

        <div className="candidates-list">
          {currentElection.candidates.map(candidate => (
            <div
              key={candidate.id}
              className={`candidate-card ${selectedChoice === candidate.id ? "selected" : ""}`}
              onClick={() => setSelectedChoice(candidate.id)}
            >
              <div className="candidate-avatar">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="candidate-info">
                <h3>{candidate.name}</h3>
                <p className="candidate-party"> {candidate.party}</p>
                <p className="candidate-description">{candidate.description}</p>
              </div>
              <div className="selection-indicator">
                {selectedChoice === candidate.id && " Selected"}
              </div>
            </div>
          ))}
        </div>

        <div className="ballot-actions">
          {selectedChoice && (
            <div className="selected-candidate-info">
              <h4>You have selected:</h4>
              <p>
                <strong>
                  {currentElection.candidates.find(c => c.id === selectedChoice)?.name}
                </strong> - 
                {currentElection.candidates.find(c => c.id === selectedChoice)?.party}
              </p>
            </div>
          )}
          <button 
            className="btn btn-primary btn-large" 
            onClick={handleVote}
            disabled={!selectedChoice}
          >
            {selectedChoice ? " Cast Your Vote" : " Select a Candidate to Vote"}
          </button>
        </div>

        <div className="eci-notice">
          <h4> Election Commission of India</h4>
          <p> Your vote is secret and secure</p>
          <p> No one can see how you voted</p>
          <p> Vote once verified citizens only</p>
          <p> Results will be announced on counting day</p>
        </div>
      </div>
    </div>
  );
};

export default VoterBallot;
