import React, { useState, useEffect } from "react";

const BlockchainDemo = () => {
  const [transactions, setTransactions] = useState([]);
  const [liveVotes, setLiveVotes] = useState({});
  
  const sampleCandidates = [
    { id: "1", name: "Narendra Modi", party: "BJP" },
    { id: "2", name: "Rahul Gandhi", party: "Congress" },
    { id: "3", name: "Mamata Banerjee", party: "TMC" }
  ];

  useEffect(() => {
    // Simulate live voting transactions
    const interval = setInterval(() => {
      const randomCandidate = sampleCandidates[Math.floor(Math.random() * sampleCandidates.length)];
      const newTransaction = {
        id: Date.now(),
        candidate: randomCandidate.name,
        party: randomCandidate.party,
        hash: `0x${Math.random().toString(16).substr(2, 16)}`,
        timestamp: new Date().toLocaleTimeString(),
        status: 'Confirmed'
      };
      
      setTransactions(prev => [newTransaction, ...prev.slice(0, 4)]);
      setLiveVotes(prev => ({
        ...prev,
        [randomCandidate.id]: (prev[randomCandidate.id] || 0) + 1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="blockchain-demo">
      <div className="card">
        <h3>🔗 Live Blockchain Voting Demo</h3>
        <p>Real-time transaction visualization on simulated blockchain</p>
        
        <div className="demo-grid">
          <div className="live-results">
            <h4>Live Vote Count</h4>
            <div className="results-bars">
              {sampleCandidates.map(candidate => (
                <div key={candidate.id} className="result-item">
                  <div className="candidate-info">
                    <span className="candidate-name">{candidate.name}</span>
                    <span className="candidate-party">{candidate.party}</span>
                  </div>
                  <div className="vote-bar">
                    <div 
                      className="vote-fill"
                      style={{ width: `${(liveVotes[candidate.id] || 0) * 20}%` }}
                    ></div>
                    <span className="vote-count">{liveVotes[candidate.id] || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="transaction-feed">
            <h4>Live Transactions</h4>
            <div className="transactions-list">
              {transactions.map(tx => (
                <div key={tx.id} className="transaction-item">
                  <div className="tx-header">
                    <span className="tx-candidate">{tx.candidate}</span>
                    <span className={`tx-status ${tx.status.toLowerCase()}`}>{tx.status}</span>
                  </div>
                  <div className="tx-hash">Hash: {tx.hash}</div>
                  <div className="tx-time">{tx.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="blockchain-info">
          <div className="info-item">
            <strong>Blocks Mined:</strong> {transactions.length}
          </div>
          <div className="info-item">
            <strong>Network:</strong> SecureVote Testnet
          </div>
          <div className="info-item">
            <strong>Consensus:</strong> Proof-of-Stake
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainDemo;
