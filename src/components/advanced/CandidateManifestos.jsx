import React, { useState } from "react";

const CandidateManifestos = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidates = [
    {
      id: 1,
      name: "Narendra Modi",
      party: "BJP",
      image: "👨‍💼",
      manifesto: {
        title: "Digital India Vision 2024",
        points: [
          "Make India a $5 trillion economy",
          "Complete digital infrastructure rollout",
          "Boost manufacturing and exports",
          "Continue welfare schemes for poor"
        ],
        videoUrl: "#",
        ipfsHash: "QmXyZ123...",
        reactions: { likes: 1245, comments: 89, shares: 234 }
      }
    },
    {
      id: 2,
      name: "Rahul Gandhi",
      party: "Congress",
      image: "👨‍🎓",
      manifesto: {
        title: "Youth Empowerment & Social Justice",
        points: [
          "1 crore new jobs for youth",
          "Strengthen education and healthcare",
          "Farmers debt waiver scheme",
          "Women empowerment programs"
        ],
        videoUrl: "#",
        ipfsHash: "QmAbC456...",
        reactions: { likes: 890, comments: 67, shares: 156 }
      }
    },
    {
      id: 3,
      name: "Mamata Banerjee",
      party: "TMC",
      image: "👩‍💼",
      manifesto: {
        title: "Federal Rights & Development",
        points: [
          "Strengthen state autonomy",
          "Industrial development in East",
          "Women safety initiatives",
          "Cultural preservation"
        ],
        videoUrl: "#",
        ipfsHash: "QmDeF789...",
        reactions: { likes: 678, comments: 45, shares: 123 }
      }
    }
  ];

  return (
    <div className="candidate-manifestos">
      <div className="card">
        <h3>🗳️ Smart Campaigns & Interactive Manifestos</h3>
        <p>Explore candidate manifestos stored on IPFS with transparent engagement metrics</p>
        
        <div className="candidates-grid">
          {candidates.map(candidate => (
            <div 
              key={candidate.id}
              className={`manifesto-card ${selectedCandidate?.id === candidate.id ? 'selected' : ''}`}
              onClick={() => setSelectedCandidate(candidate)}
            >
              <div className="candidate-header">
                <div className="candidate-avatar">{candidate.image}</div>
                <div className="candidate-info">
                  <h4>{candidate.name}</h4>
                  <p className="party">{candidate.party}</p>
                </div>
              </div>
              
              <div className="manifesto-preview">
                <h5>{candidate.manifesto.title}</h5>
                <ul>
                  {candidate.manifesto.points.slice(0, 2).map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
              
              <div className="engagement-metrics">
                <div className="metric">
                  <span className="metric-icon">👍</span>
                  <span>{candidate.manifesto.reactions.likes}</span>
                </div>
                <div className="metric">
                  <span className="metric-icon">💬</span>
                  <span>{candidate.manifesto.reactions.comments}</span>
                </div>
                <div className="metric">
                  <span className="metric-icon">🔗</span>
                  <span>IPFS: {candidate.manifesto.ipfsHash.substring(0, 8)}...</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCandidate && (
          <div className="manifesto-detail">
            <h4>Detailed Manifesto: {selectedCandidate.name}</h4>
            <div className="manifesto-content">
              <h5>{selectedCandidate.manifesto.title}</h5>
              <ul>
                {selectedCandidate.manifesto.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              
              <div className="manifesto-actions">
                <button className="btn btn-small">📺 Watch Video</button>
                <button className="btn btn-small btn-secondary">📄 View Full PDF</button>
                <button className="btn btn-small btn-success">👍 Support Manifesto</button>
              </div>
              
              <div className="ipfs-info">
                <strong>IPFS Hash:</strong> {selectedCandidate.manifesto.ipfsHash}
                <br />
                <small>Stored permanently on decentralized network</small>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateManifestos;
