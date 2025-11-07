import React, { useState, useEffect } from "react";

const SmartContractDashboard = () => {
  const [contractState, setContractState] = useState({
    totalVotes: 0,
    votersRegistered: 0,
    electionStatus: 'Active',
    contractBalance: '0.0 ETH'
  });

  const [voteDistribution, setVoteDistribution] = useState([]);

  useEffect(() => {
    // Simulate contract state updates
    const interval = setInterval(() => {
      setContractState(prev => ({
        totalVotes: prev.totalVotes + Math.floor(Math.random() * 3),
        votersRegistered: prev.votersRegistered + Math.floor(Math.random() * 2),
        electionStatus: 'Active',
        contractBalance: `${(Math.random() * 0.1).toFixed(3)} ETH`
      }));

      setVoteDistribution([
        { candidate: 'Narendra Modi', votes: Math.floor(Math.random() * 100) + 50 },
        { candidate: 'Rahul Gandhi', votes: Math.floor(Math.random() * 80) + 30 },
        { candidate: 'Mamata Banerjee', votes: Math.floor(Math.random() * 70) + 20 }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="smart-contract-dashboard">
      <div className="card">
        <h3>⚡ Smart Contract Dashboard</h3>
        <p>Real-time election contract monitoring and automatic tallying</p>
        
        <div className="contract-stats">
          <div className="stat-card">
            <h4>Total Votes</h4>
            <div className="stat-value">{contractState.totalVotes}</div>
            <p>On-chain votes</p>
          </div>
          <div className="stat-card">
            <h4>Voters Registered</h4>
            <div className="stat-value">{contractState.votersRegistered}</div>
            <p>Verified identities</p>
          </div>
          <div className="stat-card">
            <h4>Election Status</h4>
            <div className="stat-value status-active">{contractState.electionStatus}</div>
            <p>Contract state</p>
          </div>
          <div className="stat-card">
            <h4>Contract Balance</h4>
            <div className="stat-value">{contractState.contractBalance}</div>
            <p>Gas fees reserved</p>
          </div>
        </div>

        <div className="vote-distribution">
          <h4>Live Vote Distribution</h4>
          <div className="distribution-bars">
            {voteDistribution.map((candidate, index) => (
              <div key={index} className="distribution-item">
                <div className="candidate-name">{candidate.candidate}</div>
                <div className="distribution-bar">
                  <div 
                    className="distribution-fill"
                    style={{ 
                      width: `${(candidate.votes / Math.max(...voteDistribution.map(v => v.votes))) * 100}%`,
                      background: `hsl(${index * 120}, 70%, 50%)`
                    }}
                  ></div>
                  <span className="vote-count">{candidate.votes} votes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contract-actions">
          <h4>Contract Functions</h4>
          <div className="action-buttons">
            <button className="btn btn-small">View Source Code</button>
            <button className="btn btn-small btn-secondary">Verify on Etherscan</button>
            <button className="btn btn-small btn-success">Export Results</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartContractDashboard;
