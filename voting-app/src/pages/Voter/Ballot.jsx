import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const VoterBallot = () => {
  const { electionId } = useParams()
  const [selectedChoice, setSelectedChoice] = useState(null)
  
  // Mock candidates data
  const candidates = [
    { id: '1', name: 'Candidate A', description: 'Focus on security and transparency' },
    { id: '2', name: 'Candidate B', description: 'Emphasis on accessibility features' },
    { id: '3', name: 'Candidate C', description: 'Innovation and new features' }
  ]

  const handleVote = async () => {
    if (!selectedChoice) return
    
    // Simulate vote submission
    console.log('Voting for:', selectedChoice)
    alert('Vote submitted successfully!')
  }

  return (
    <div className="voter-ballot">
      <div className="card">
        <h1>Election Ballot</h1>
        <p>Please select your preferred candidate:</p>

        <div className="ballot-options">
          {candidates.map(candidate => (
            <div
              key={candidate.id}
              className={`ballot-item ${selectedChoice === candidate.id ? 'selected' : ''}`}
              onClick={() => setSelectedChoice(candidate.id)}
            >
              <h3>{candidate.name}</h3>
              <p>{candidate.description}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button 
            className="btn" 
            onClick={handleVote}
            disabled={!selectedChoice}
          >
            Submit Vote
          </button>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '4px' }}>
          <h4>Security Notice</h4>
          <small>
            Your vote is encrypted and secure. You will receive a receipt for verification purposes. 
            This is a secret ballot - your choices are anonymous.
          </small>
        </div>
      </div>
    </div>
  )
}

export default VoterBallot
