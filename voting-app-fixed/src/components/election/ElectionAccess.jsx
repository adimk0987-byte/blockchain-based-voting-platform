import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ElectionAccess = () => {
  const navigate = useNavigate();
  const { elections, idVerified } = useAuth();
  const [electionId, setElectionId] = useState("");

  const handleAccessElection = () => {
    if (!electionId.trim()) {
      alert("Please enter an Election ID");
      return;
    }

    const election = elections.find(e => e.id === electionId.toLowerCase());
    if (!election) {
      alert("Election not found. Please check the Election ID.");
      return;
    }

    if (!idVerified) {
      alert("Please complete ID verification before accessing the election.");
      navigate("/login");
      return;
    }

    navigate(`/vote/${election.id}`);
  };

  return (
    <div className="election-access">
      <div className="card">
        <h3>Access Election by ID</h3>
        <p>Enter an Election ID to go directly to the voting booth</p>
        
        <div className="form-group">
          <label className="form-label">Election ID</label>
          <input
            type="text"
            className="form-input"
            value={electionId}
            onChange={(e) => setElectionId(e.target.value)}
            placeholder="e.g., ls-2024, delhi-assembly, du-elections"
          />
        </div>

        <button 
          className="btn btn-primary"
          onClick={handleAccessElection}
          disabled={!electionId.trim()}
        >
          Go to Election
        </button>

        <div className="available-elections" style={{marginTop: '2rem'}}>
          <h4>Available Elections:</h4>
          <div className="election-tags">
            {elections.slice(0, 3).map(election => (
              <span 
                key={election.id}
                className="election-tag"
                onClick={() => setElectionId(election.id)}
                style={{cursor: 'pointer'}}
              >
                {election.id}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionAccess;
